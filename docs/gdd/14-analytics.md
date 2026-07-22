# 14 — Analytics

## Objetivo

Entender aprendizado e saúde do produto **sem** vigilância invasiva.

## Eventos de produto (exemplos)

| Evento | Props |
|---|---|
| `session_start` | mapId, modeId, profileAgeBand |
| `attempt` | regionId, correct, responseMs |
| `session_end` | score, accuracy, durationMs |
| `paywall_view` | source |
| `purchase_*` | productId (sem PII desnecessária) |

## Métricas de aprendizado

- Taxa de acerto por região (conteúdo frágil)
- Tempo médio de resposta
- Retenção de sessões curtas (D1/D7) sem gamificação tóxica
- Uso de Treino vs. modos de pressão

## Privacidade

- Perfis infantis: mínimo de dados; consentimento parental onde aplicável (LGPD).
- Sem venda de dados.
- Analytics opt-out nas configurações.
- Escolas: contratos e DPA; dados da turma sob controle da instituição.

## Ferramenta

Definir na implementação (ex.: evento tipado interno → sink pluggable). MVP pode ser só persistência local + export.
