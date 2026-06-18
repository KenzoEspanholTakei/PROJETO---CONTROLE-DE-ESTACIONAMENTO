export default class Model {
    constructor() {
        const configSalva = localStorage.getItem('estacionamento_config');
        if (configSalva) {
            this.config = JSON.parse(configSalva);
            if (this.config.valorDiariaCarro === undefined) {
                this.config.valorDiariaCarro = this.config.valorDiaria || 50;
                this.config.valorDiariaMoto = this.config.valorDiaria || 30;
                delete this.config.valorDiaria;
            }
        } else {
            this.config = {
                valorHoraCarro: 10,
                valorHoraMoto: 5,
                valorDiariaCarro: 50,
                valorDiariaMoto: 30
            };
        }

        // Carrega veículos
        const dadosSalvos = localStorage.getItem('estacionamento_veiculos');
        if (dadosSalvos) {
            this.veiculos = JSON.parse(dadosSalvos).map(v => ({
                ...v,
                entrada: new Date(v.entrada)
            }));
        } else {
            this.veiculos = [];
        }

        // Carrega Faturamento do Dia
        const faturamentoSalvo = localStorage.getItem('estacionamento_faturamento');
        const hoje = new Date().toLocaleDateString('pt-BR');
        if (faturamentoSalvo) {
            const dadosFat = JSON.parse(faturamentoSalvo);
            if (dadosFat.data === hoje) {
                this.faturamentoHoje = dadosFat.valor;
            } else {
                this.faturamentoHoje = 0;
            }
        } else {
            this.faturamentoHoje = 0;
        }
    }

    salvarConfig(config) {
        this.config = { ...this.config, ...config };
        localStorage.setItem('estacionamento_config', JSON.stringify(this.config));
    }

    obterConfig() {
        return this.config;
    }

    _salvarDados() {
        localStorage.setItem('estacionamento_veiculos', JSON.stringify(this.veiculos));
    }

    adicionarVeiculo(placa, tipo, modelo, dataEntrada) {
        const placaFormatada = placa.toUpperCase();
        
        if (this.veiculos.some(v => v.placa === placaFormatada)) {
            throw new Error('Já existe um veículo com esta placa no pátio!');
        }

        const id = Date.now().toString();
        const novoVeiculo = { 
            id, 
            placa: placaFormatada, 
            tipo,
            modelo, 
            entrada: dataEntrada 
        };
        this.veiculos.push(novoVeiculo);
        this._salvarDados();
        
        return novoVeiculo;
    }

    // Não remove o veículo de verdade ainda, apenas busca
    encontrarVeiculo(id) {
        return this.veiculos.find(v => v.id === id);
    }

    // Remove pra valer quando confirmar o pagamento
    removerVeiculo(id) {
        this.veiculos = this.veiculos.filter(v => v.id !== id);
        this._salvarDados();
    }

    obterVeiculos() {
        return this.veiculos;
    }

    adicionarFaturamento(valor) {
        const hoje = new Date().toLocaleDateString('pt-BR');
        this.faturamentoHoje += valor;
        localStorage.setItem('estacionamento_faturamento', JSON.stringify({
            data: hoje,
            valor: this.faturamentoHoje
        }));
    }

    obterFaturamento() {
        return this.faturamentoHoje;
    }
}
