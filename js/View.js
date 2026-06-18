export default class View {
    constructor() {
        // Form Config
        this.configForm = document.getElementById('config-form');
        this.inputPrecoCarro = document.getElementById('preco-carro');
        this.inputPrecoMoto = document.getElementById('preco-moto');
        this.inputPrecoDiariaCarro = document.getElementById('preco-diaria-carro');
        this.inputPrecoDiariaMoto = document.getElementById('preco-diaria-moto');

        // Form Veiculo
        this.form = document.getElementById('vehicle-form');
        this.placaInput = document.getElementById('placa');
        this.tipoInput = document.getElementById('tipo');
        this.modeloInput = document.getElementById('modelo');
        this.dataEntradaInput = document.getElementById('data-entrada');
        
        this.vehicleList = document.getElementById('vehicle-list');
        this.emptyMessage = document.getElementById('empty-message');

        // Modal Recibo
        this.modal = document.getElementById('receipt-modal');
        this.modalContent = this.modal ? this.modal.querySelector('div') : null;
        this.btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
        this.btnCloseModal = document.getElementById('btn-close-modal');
        this.btnCancelModal = document.getElementById('btn-cancel-modal');
        this.receiptPlaca = document.getElementById('receipt-placa');
        this.receiptModelo = document.getElementById('receipt-modelo');
        this.receiptEntrada = document.getElementById('receipt-entrada');
        this.receiptDataSaidaInput = document.getElementById('receipt-data-saida');
        this.receiptTempo = document.getElementById('receipt-tempo');
        this.receiptValor = document.getElementById('receipt-valor');

        // Dashboard & Filtro
        this.dashVeiculos = document.getElementById('dash-veiculos');
        this.dashFaturamento = document.getElementById('dash-faturamento');
        this.filtroPlaca = document.getElementById('filtro-placa');

        this._inicializarMascaraPlaca();
        this.preencherDataEntradaAtual();
    }

    _inicializarMascaraPlaca() {
        this.placaInput.addEventListener('input', (e) => {
            let valor = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            valor = valor.substring(0, 7);
            if (valor.length > 3) {
                valor = valor.substring(0, 3) + '-' + valor.substring(3);
            }
            e.target.value = valor;
        });
    }

    _formatarDataParaInput(data) {
        // Formata Date para yyyy-MM-ddThh:mm (aceito pelo datetime-local)
        const d = new Date(data.getTime() - data.getTimezoneOffset() * 60000);
        return d.toISOString().slice(0, 16);
    }

    preencherDataEntradaAtual() {
        this.dataEntradaInput.value = this._formatarDataParaInput(new Date());
    }

    preencherConfiguracoes(config) {
        this.inputPrecoCarro.value = config.valorHoraCarro;
        this.inputPrecoMoto.value = config.valorHoraMoto;
        this.inputPrecoDiariaCarro.value = config.valorDiariaCarro;
        this.inputPrecoDiariaMoto.value = config.valorDiariaMoto;
    }

    bindSalvarConfig(handler) {
        this.configForm.addEventListener('submit', event => {
            event.preventDefault();
            const config = {
                valorHoraCarro: parseFloat(this.inputPrecoCarro.value),
                valorHoraMoto: parseFloat(this.inputPrecoMoto.value),
                valorDiariaCarro: parseFloat(this.inputPrecoDiariaCarro.value),
                valorDiariaMoto: parseFloat(this.inputPrecoDiariaMoto.value)
            };
            handler(config);
            alert('Preços salvos com sucesso!');
        });
    }

    bindAdicionarVeiculo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const placa = this.placaInput.value.trim();
            const tipo = this.tipoInput.value;
            const modelo = this.modeloInput.value.trim();
            const dataEntrada = new Date(this.dataEntradaInput.value);
            
            if (placa && modelo) {
                handler(placa, tipo, modelo, dataEntrada);
            }
        });
    }

    bindRemoverVeiculo(handler) {
        this.vehicleList.addEventListener('click', event => {
            const btnRemover = event.target.closest('.btn-remover');
            if (btnRemover) {
                const id = btnRemover.dataset.id;
                handler(id);
            }
        });
    }

    bindFiltro(handler) {
        this.filtroPlaca.addEventListener('input', (e) => {
            handler(e.target.value);
        });
    }

    atualizarDashboard(qtdVeiculos, faturamento) {
        if(this.dashVeiculos) this.dashVeiculos.textContent = qtdVeiculos;
        if(this.dashFaturamento) this.dashFaturamento.textContent = `R$ ${faturamento.toFixed(2).replace('.', ',')}`;
    }

    limparFormulario() {
        this.placaInput.value = '';
        this.modeloInput.value = '';
        this.preencherDataEntradaAtual();
        this.placaInput.focus();
    }

    exibirErro(mensagem) {
        alert(mensagem);
    }

    // Modal
    abrirModalRecibo(veiculo, handlerCalculo, onConfirm) {
        this.receiptPlaca.textContent = veiculo.placa;
        this.receiptModelo.textContent = `${veiculo.tipo.toUpperCase()} - ${veiculo.modelo}`;
        
        const entradaFormatada = veiculo.entrada.toLocaleString('pt-BR');
        this.receiptEntrada.textContent = entradaFormatada;

        // Preenche saída default (agora)
        this.receiptDataSaidaInput.value = this._formatarDataParaInput(new Date());

        // Função de atualização local
        const atualizarValores = () => {
            const dataSaida = new Date(this.receiptDataSaidaInput.value);
            const calculo = handlerCalculo(veiculo, dataSaida);
            
            this.receiptTempo.textContent = calculo.tempoText;
            this.receiptValor.textContent = calculo.valorText;
            
            if (calculo.erro) {
                this.receiptValor.textContent = 'Data de saída inválida';
                this.receiptValor.classList.remove('text-green-400');
                this.receiptValor.classList.add('text-red-400');
                this.btnCloseModal.disabled = true;
                this.btnCloseModal.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                this.receiptValor.classList.add('text-green-400');
                this.receiptValor.classList.remove('text-red-400');
                this.btnCloseModal.disabled = false;
                this.btnCloseModal.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        };

        // Escuta mudanças de hora para recalcular
        this.receiptDataSaidaInput.onchange = atualizarValores;
        atualizarValores(); // primeira chamada

        this.modal.classList.remove('hidden');
        setTimeout(() => {
            this.modal.classList.remove('opacity-0');
            this.modalContent.classList.remove('scale-95');
        }, 10);

        // Remover handlers antigos para evitar memory leaks
        this.btnCloseModal.onclick = () => {
            this.fecharModal();
            const dataSaida = new Date(this.receiptDataSaidaInput.value);
            const calculo = handlerCalculo(veiculo, dataSaida);
            onConfirm(calculo.valorTotal);
        };

        this.btnCancelModal.onclick = () => {
            this.fecharModal();
        };

        this.btnShareWhatsapp.onclick = () => {
            const dataSaida = new Date(this.receiptDataSaidaInput.value);
            const calculo = handlerCalculo(veiculo, dataSaida);
            if (calculo.erro) return;

            const texto = `*Recibo de Estacionamento*\n\nPlaca: ${veiculo.placa}\nModelo: ${veiculo.tipo.toUpperCase()} - ${veiculo.modelo}\nEntrada: ${entradaFormatada}\nSaída: ${dataSaida.toLocaleString('pt-BR')}\nTempo: ${calculo.tempoText}\n\n*Total: ${calculo.valorText}*\n\nObrigado!`;
            const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
            window.open(url, '_blank');
        };
    }

    fecharModal() {
        this.modal.classList.add('opacity-0');
        this.modalContent.classList.add('scale-95');
        setTimeout(() => {
            this.modal.classList.add('hidden');
        }, 300);
    }

    exibirVeiculos(veiculos) {
        this.vehicleList.innerHTML = '';
        if (veiculos.length === 0) {
            this.emptyMessage.classList.remove('hidden');
        } else {
            this.emptyMessage.classList.add('hidden');
            
            veiculos.forEach(veiculo => {
                const card = document.createElement('div');
                card.className = 'bg-white/10 border border-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/20 transition duration-300';
                
                const timeStr = veiculo.entrada.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
                const isMoto = veiculo.tipo === 'moto';

                card.innerHTML = `
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="text-xl">${isMoto ? '🏍️' : '🚗'}</span>
                            <div class="font-bold text-xl tracking-wider">${veiculo.placa}</div>
                        </div>
                        <div class="text-sm text-white/80 mt-1">${veiculo.modelo}</div>
                        <div class="text-xs text-white/60 mt-1 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            In: ${timeStr}
                        </div>
                    </div>
                    <button class="btn-remover bg-red-500/80 hover:bg-red-600 border border-red-400/50 text-white px-4 py-2 rounded-lg transition shadow-md font-medium text-sm flex items-center gap-2" data-id="${veiculo.id}">
                        Checkout
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                `;
                this.vehicleList.appendChild(card);
            });
        }
    }
}
