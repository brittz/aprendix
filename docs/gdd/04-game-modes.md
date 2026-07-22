# 04 — Modos de Jogo

Todos os modos consomem a mesma engine de mapas + dataset de regiões.

## MVP

### Encontre a Região

- Sistema: “Encontre Goiás.”
- Jogador clica na região.
- Feedback imediato.
- Ideal para touch e aprendizado ativo.

### Nomeie a Região

- Jogador identifica a região (clique ou destaque) e informa o nome.
- Resultado ao final: acertos, erros, percentual, pontuação.

### Treino

- Sem tempo, sem pontuação, sem pressão.
- Feedback educativo; pode repetir à vontade.
- Modo padrão sugerido para primeiras sessões e crianças.

---

## Pós-MVP

### Capitais

- Mostra estado (ou país); jogador responde a capital.

### Arrastar e Soltar

- Nomes separados; arrastar para a posição correta no mapa.

### Contra o Tempo

- Ex.: 60 segundos; maximizar acertos.
- Opcional e desativável por perfil infantil.

### Sobrevivência

- Erros consomem vidas; zero vidas = fim.
- Não recomendado para faixas muito jovens (flag no perfil).

### Desafio Diário

- Um desafio por dia (estados, capitais, bandeiras…).
- Sem punição por “perder o dia”; histórico positivo apenas.

---

## Matriz modo × monetização (referência)

| Modo | Free (BR estados) | Assinatura / Pacote Geo |
|---|---|---|
| Treino | Sim | Sim |
| Encontre / Nomeie | Sim (BR) | + outros mapas |
| Capitais / Continentes | Amostra limitada | Completo |
| Contra o Tempo / Sobrevivência | Sim (BR) | Sim |
| Desafio Diário | Básico | Completo + histórico |

---

## Configuração por modo

Cada modo declara:

- `id`, `nameKey` (i18n)
- `scoringEnabled`
- `timerEnabled` / `timerSeconds`
- `livesEnabled` / `maxLives`
- `immediateFeedback`
- `minAgeRecommendation`
- `inputType`: `tap` | `text` | `drag`
