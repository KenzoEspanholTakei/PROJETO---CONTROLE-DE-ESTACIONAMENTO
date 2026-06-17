# Guia de Publicação de Web App usando o MCP do Firebase

## 1. Introdução

Este documento estabelece as diretrizes e os passos necessários para realizar o deploy (publicação) da nossa aplicação web utilizando o **MCP (Model Context Protocol) do Firebase**. O objetivo é garantir que o processo de publicação no **Firebase Hosting** seja consistente, rápido e seguro, permitindo que a aplicação seja disponibilizada globalmente com certificados SSL automáticos e alta performance.

## 2. Pré-requisitos

Antes de iniciar a publicação via MCP ou linha de comando, certifique-se de ter os seguintes itens configurados:

- **Conta e Projeto Firebase**: Ter um projeto ativo criado no [Firebase Console](https://console.firebase.google.com/).
- **Node.js e Firebase CLI**: O Node.js deve estar instalado na máquina. O Firebase CLI deve ser instalado globalmente rodando:
  ```bash
  npm install -g firebase-tools
  ```
- **Autenticação**: O ambiente deve estar autenticado com a conta Google dona do projeto:
  ```bash
  firebase login
  ```
- **Código Pronto**: Os arquivos da aplicação (ex: `index.html`, pasta `js/`) devem estar prontos e funcionando perfeitamente em ambiente local.

## 3. Configuração e Inicialização

### 3.1 Inicializando o Hosting
No terminal, dentro da pasta raiz do projeto, inicie a configuração do Firebase:
```bash
firebase init hosting
```

O assistente do Firebase fará algumas perguntas. Siga este padrão:
1. **Project Setup**: Selecione `Use an existing project` e escolha o projeto criado no console.
2. **Public Directory**: Defina o diretório onde estão seus arquivos. Se o `index.html` estiver na raiz do repositório, digite `.` (ponto). Se estiver numa subpasta, digite o nome dela (ex: `public`).
3. **Single-page app**: Responda `N` (Não) se for um site de múltiplas páginas simples, ou `Y` (Sim) caso seja um projeto React/Vue ou SPA puro que precisa redirecionar rotas para o `index.html`.
4. **Overwrite index.html**: Responda `N` (Não) para não perder a sua interface recém-criada.

### 3.2 Arquivo `firebase.json`
A etapa anterior criará um arquivo chamado `firebase.json` na raiz do projeto. Ele instrui o Firebase sobre como hospedar seus arquivos. Ele deve ficar parecido com isto:
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

## 4. Realizando a Publicação (Deploy)

Com o ambiente configurado e o arquivo `firebase.json` mapeando corretamente os arquivos web, utilize a instrução de deploy para publicar o site:

```bash
firebase deploy --only hosting
```

Aguarde alguns segundos. O Firebase fará o upload dos arquivos e configurará o domínio.

## 5. Verificação Pós-Deploy

Ao final do comando, o terminal exibirá uma mensagem de sucesso (✔ Deploy complete!) e imprimirá a **Hosting URL** (geralmente no formato `https://nome-do-projeto.web.app` ou `https://nome-do-projeto.firebaseapp.com`).

**Checklist de Validação:**
- [ ] Acesse a URL gerada pelo seu navegador.
- [ ] Verifique se o CSS (Tailwind via CDN) foi carregado com sucesso.
- [ ] Teste as funcionalidades dinâmicas de JavaScript (ex: Modal de saída) para garantir que não há erros de importação de módulos.

---

> [!TIP]
> **Dica de Ouro:** Sempre que modificar seu código localmente e quiser atualizar o site que está no ar, basta rodar `firebase deploy --only hosting` novamente. O Firebase cuidará do cache para entregar a versão mais recente instantaneamente!
