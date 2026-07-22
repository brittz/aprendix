# 02 — Game Loop

## Loop principal (sessão)

```text
1. Escolher mapa / conteúdo
2. Escolher modo
3. Jogar rodada(s) curtas
4. Ver resultado da sessão
5. Comparar com desempenho anterior
6. (Opcional) Repetir ou trocar modo
```

Sessões-alvo: **3–10 minutos** (mais curtas nas faixas infantis).

---

## Loop de uma pergunta (modo “Encontre a Região”)

```text
Prompt: "Encontre Goiás"
        ↓
Jogador clica em uma região
        ↓
Feedback imediato (acerto / erro + revelação suave)
        ↓
Próxima região (ou fim da rodada)
```

## Loop de uma pergunta (modo “Nomeie a Região”)

```text
Jogador clica / recebe região destacada
        ↓
Digita (ou escolhe) o nome
        ↓
Acumula até o fim da lista
        ↓
Tela de resultado: acertos, erros, %, pontuação
```

---

## Loop de progresso (meta-loop)

```text
Jogar → Registrar métricas → Atualizar estatísticas
     → Mostrar evolução ("18 → 25 estados")
     → Sugerir foco nas regiões com mais erro
```

Não há pressão de login diário obrigatório, streaks punitivos ou energia.

---

## Estados da sessão

| Estado | Descrição |
|---|---|
| `idle` | Menu / seleção |
| `playing` | Rodada ativa |
| `paused` | Pausado (sem penalidade agressiva) |
| `round_end` | Resultado da rodada |
| `session_end` | Resumo + evolução |

---

## Feedback

- Acerto: reforço visual suave + som discreto.
- Erro: indicação clara da região correta (quando aplicável), sem humilhação.
- Fim: números objetivos + comparação com o “você de antes”.
