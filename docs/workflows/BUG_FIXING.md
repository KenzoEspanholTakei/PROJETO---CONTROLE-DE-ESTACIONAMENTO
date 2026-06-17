# 🐛 Workflow: Bug Fixing

Este é o pipeline sequencial obrigatório sempre que o usuário reportar um **Bug**.

## Passo a Passo da IA

1. **Triagem (`QA_TESTER_AGENT.md`)**:
   - Como reproduzir? O que está falhando (Caminho feliz vs Caminho trágico)?
2. **Isolamento (`ARCHITECT_AGENT.md`)**:
   - De onde vem o bug? É erro de UI (View), erro lógico (Model) ou perda de referência (Controller)?
3. **Resolução (`BACKEND_AGENT` ou `FRONTEND_AGENT`)**:
   - Modifique o código necessário seguindo os princípios de Responsabilidade Única.
4. **Auditoria e Regressão (`SECURITY_AGENT` e `QA_TESTER_AGENT`)**:
   - O fix abriu alguma brecha (ex: `.innerHTML` inseguro para corrigir formatação)?
   - O fix afeta outras funcionalidades?
