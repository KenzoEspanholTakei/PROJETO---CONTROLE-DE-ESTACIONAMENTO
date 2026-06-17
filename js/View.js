export default class View {
    constructor() {
        this.form = document.getElementById('vehicle-form');
        this.placaInput = document.getElementById('placa');
        this.modeloInput = document.getElementById('modelo');
        this.vehicleList = document.getElementById('vehicle-list');
        this.emptyMessage = document.getElementById('empty-message');
    }

    bindAdicionarVeiculo(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            const placa = this.placaInput.value.trim();
            const modelo = this.modeloInput.value.trim();
            
            if (placa && modelo) {
                handler(placa, modelo);
                this.form.reset();
                this.placaInput.focus();
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

    exibirVeiculos(veiculos) {
        // Limpa a lista atual
        this.vehicleList.innerHTML = '';
        
        if (veiculos.length === 0) {
            this.emptyMessage.classList.remove('hidden');
        } else {
            this.emptyMessage.classList.add('hidden');
            
            veiculos.forEach(veiculo => {
                const card = document.createElement('div');
                card.className = 'bg-white/10 border border-white/20 rounded-xl p-4 flex justify-between items-center hover:bg-white/20 transition duration-300';
                
                // Formata a hora de entrada
                const timeStr = veiculo.entrada.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

                card.innerHTML = `
                    <div>
                        <div class="font-bold text-xl tracking-wider">${veiculo.placa}</div>
                        <div class="text-sm text-white/80">${veiculo.modelo}</div>
                        <div class="text-xs text-white/60 mt-1 flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Entrada: ${timeStr}
                        </div>
                    </div>
                    <button class="btn-remover bg-red-500/80 hover:bg-red-600 border border-red-400/50 text-white px-4 py-2 rounded-lg transition shadow-md font-medium text-sm flex items-center gap-2" data-id="${veiculo.id}">
                        Dar Saída
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
