export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Bindings
        this.view.bindSalvarConfig(this.handleSalvarConfig.bind(this));
        this.view.bindAdicionarVeiculo(this.handleAdicionarVeiculo.bind(this));
        this.view.bindRemoverVeiculo(this.handleIniciarCheckout.bind(this));

        // Inicializa tela
        this.view.preencherConfiguracoes(this.model.obterConfig());
        this.atualizarLista();
    }

    handleSalvarConfig(config) {
        this.model.salvarConfig(config);
    }

    handleAdicionarVeiculo(placa, tipo, modelo, dataEntrada) {
        try {
            this.model.adicionarVeiculo(placa, tipo, modelo, dataEntrada);
            this.view.limparFormulario();
            this.atualizarLista();
        } catch (erro) {
            this.view.exibirErro(erro.message);
        }
    }

    calcularEstadia(veiculo, dataSaida) {
        const config = this.model.obterConfig();
        const entrada = veiculo.entrada;
        
        if (dataSaida < entrada) {
            return { erro: true };
        }

        const diferencaMs = dataSaida - entrada;
        const minutosTotais = Math.floor(diferencaMs / (1000 * 60));
        
        // Separa dias e minutos restantes
        const dias = Math.floor(minutosTotais / 1440); // 1 dia = 1440 min
        const minutosRestantesDia = minutosTotais % 1440;
        
        // Calcula horas cheias do restante do dia
        let horas = Math.floor(minutosRestantesDia / 60);
        const minutosFracao = minutosRestantesDia % 60;
        
        // Regra de carência de 5 minutos
        if (minutosFracao > 5) {
            horas += 1;
        }
        
        // Mínimo de cobrança 1 hora se ficou menos de 1h (e 0 dias) e menos de 5 min?
        // Se ficou 3 minutos, não cobra (ou cobra 1h?). A regra geralmente cobra 1h.
        if (dias === 0 && horas === 0 && minutosTotais > 0) {
            horas = 1;
        }

        // Valor base (Carro ou Moto)
        const valorHora = veiculo.tipo === 'moto' ? config.valorHoraMoto : config.valorHoraCarro;
        
        let valorHorasExtra = horas * valorHora;
        
        const valorDiaria = veiculo.tipo === 'moto' ? config.valorDiariaMoto : config.valorDiariaCarro;

        // Teto da diária: se o valor das horas ultrapassar a diária, cobra a diária.
        if (valorHorasExtra > valorDiaria) {
            valorHorasExtra = valorDiaria;
        }

        const valorTotal = (dias * valorDiaria) + valorHorasExtra;

        // Texto formatado de tempo
        let tempoText = '';
        if (dias > 0) tempoText += `${dias}d `;
        if (horas > 0) tempoText += `${horas}h `;
        if (minutosFracao > 0 && minutosFracao <= 5) tempoText += `(c/ carência)`;

        if(tempoText === '') tempoText = '0 min';

        return {
            erro: false,
            tempoText: tempoText.trim(),
            valorTotal,
            valorText: `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
        };
    }

    handleIniciarCheckout(id) {
        const veiculo = this.model.encontrarVeiculo(id);
        if (veiculo) {
            this.view.abrirModalRecibo(
                veiculo, 
                // Função de cálculo repassada para a View
                (v, dataSaida) => this.calcularEstadia(v, dataSaida),
                // Callback de confirmação real
                () => {
                    this.model.removerVeiculo(id);
                    this.atualizarLista();
                }
            );
        }
    }

    atualizarLista() {
        const veiculos = this.model.obterVeiculos();
        this.view.exibirVeiculos(veiculos);
    }
}
