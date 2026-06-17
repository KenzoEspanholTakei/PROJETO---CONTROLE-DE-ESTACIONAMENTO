export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Conecta as ações da View com os métodos do Controller
        this.view.bindAdicionarVeiculo(this.handleAdicionarVeiculo.bind(this));
        this.view.bindRemoverVeiculo(this.handleRemoverVeiculo.bind(this));

        // Renderização inicial
        this.atualizarView();
    }

    handleAdicionarVeiculo(placa, modelo) {
        // Adiciona no model
        this.model.adicionarVeiculo(placa, modelo);
        // Atualiza a interface
        this.atualizarView();
    }

    handleRemoverVeiculo(id) {
        // Remove no model
        this.model.removerVeiculo(id);
        // Atualiza a interface
        this.atualizarView();
    }

    atualizarView() {
        const veiculos = this.model.obterVeiculos();
        this.view.exibirVeiculos(veiculos);
    }
}
