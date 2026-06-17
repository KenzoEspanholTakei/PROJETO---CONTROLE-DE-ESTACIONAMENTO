# 🏭 Workflow: Feature Delivery

Este é o pipeline sequencial obrigatório sempre que o usuário pedir uma **nova funcionalidade**.

## Passo a Passo da IA

1. **Consulta ao PO (`PO_AGENT.md`)**:
   - Analisar o requisito. Quais são as regras de negócio? Faz sentido? Existe alguma restrição lógica?
2. **Design de Estrutura (`ARCHITECT_AGENT.md`) & (`CONTRACTS.md`)**:
   - A entidade mudou? Atualize os Contratos. Como o Controller vai rotear isso?
3. **Persistência (`BACKEND_AGENT.md`)**:
   - Implemente a lógica pura no `Model.js` e em seguida os testes unitários da regra.
4. **Interface e Lógica (`FRONTEND_AGENT.md` & `DESIGN_AGENT.md`)**:
   - O Frontend lida com a captura dos eventos no DOM.
   - O Designer garante a beleza do Glassmorphism.
5. **Auditoria Tripla (`QA_TESTER_AGENT`, `ACCESSIBILITY_AGENT`, `SECURITY_AGENT`)**:
   - **QA**: Valida inputs vazios e edge cases.
   - **A11y**: Checa os labels e a tabulação.
   - **Security**: Garante a sanitização contra XSS no DOM.

*Apenas após percorrer mentalmente (ou explicitamente em logs) este pipeline, a IA deve apresentar o resultado final ao usuário.*
