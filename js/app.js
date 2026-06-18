import Model from './Model.js';
import View from './View.js';
import Controller from './Controller.js';

// Inicializa a aplicação assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const app = new Controller(new Model(), new View());
    
    // Registra Service Worker (PWA)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => console.log('SW Registrado: ', registration))
                .catch(err => console.log('Erro ao registrar SW: ', err));
        });
    }
});
