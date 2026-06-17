# 🔍 Workflow: Code Review

Pipeline utilizado quando o usuário pede uma "revisão de código", "análise", ou "limpeza/refatoração".

## Passo a Passo da IA

1. **Auditoria de Performance (`DEVOPS_AGENT.md`)**:
   - Há loops pesados? Os event listeners estão sendo removidos? O DOM está sendo recriado sem necessidade?
2. **Auditoria de Segurança (`SECURITY_AGENT.md`)**:
   - Verificar toda e qualquer manipulação de DOM (`innerHTML`, `insertAdjacentHTML`). Validar sanitize.
3. **Auditoria Visual (`DESIGN_AGENT` e `ACCESSIBILITY_AGENT`)**:
   - Há quebra de contraste? Elementos interativos sem feedback visual (focus/hover)?
4. **Auditoria Arquitetural (`ARCHITECT_AGENT.md`)**:
   - O código está coeso? Acoplamento baixo?

*A IA deve entregar um relatório detalhado com os achados e, se autorizado, prosseguir para o `BUG_FIXING.md`.*
