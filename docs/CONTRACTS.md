# 📄 Contratos de Dados (SSOT de Estruturas)

> **Single Source of Truth de Dados** — Este documento define o formato estrito dos dados que fluem pelo sistema. Nem o Backend nem o Frontend têm permissão para divergir destas tipagens.

---

## 1. Entidade: Veículo (`Vehicle`)

Esta é a estrutura oficial de um veículo trafegando entre a `View`, o `Controller` e o `Model`.

```typescript
interface Vehicle {
  id: string;          // Timestamp string ou UUID (gerado exclusivamente pelo Backend)
  placa: string;       // Formato alfanumérico UPPERCASE, trimmed. Não deve conter caracteres especiais, exceto traço (opcional).
  modelo: string;      // Nome do modelo, trimmed. Primeira letra maiúscula.
  entrada: Date;       // Objeto de data nativo do JS. O frontend formata, o backend armazena cru.
  saida?: Date;        // (Futuro) Quando o carro sair.
  valorDevido?: number;// (Futuro) Valor a pagar no momento da saída.
}
```

## 2. Eventos (View -> Controller)

Quando a `View` dispara eventos, este é o contrato de payload esperado pelos handlers do `Controller`:

* **`onAdicionar(placa: string, modelo: string)`**
* **`onRemover(id: string)`**

*(Nota para os Agentes: Se o PO sugerir que precisamos capturar a "cor do veículo", este contrato DEVE ser atualizado antes de qualquer código ser escrito).*
