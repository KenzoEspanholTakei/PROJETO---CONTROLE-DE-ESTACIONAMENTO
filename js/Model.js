export default class Model {
    constructor() {
        this.veiculos = [];
    }

    adicionarVeiculo(placa, modelo) {
        const id = Date.now().toString(); // Identificador único simples
        const novoVeiculo = { 
            id, 
            placa: placa.toUpperCase(), 
            modelo, 
            entrada: new Date() 
        };
        this.veiculos.push(novoVeiculo);
        return novoVeiculo;
    }

    removerVeiculo(id) {
        this.veiculos = this.veiculos.filter(veiculo => veiculo.id !== id);
    }

    obterVeiculos() {
        return this.veiculos;
    }
}
