# 17 — Jogos por faixa etária

**Status:** Fase 2.1 (bebês 0–1) implementada no app; próximas faixas no roadmap.  
**Posicionamento:** desenvolvimento cognitivo por idade, não “mais um app de jogos”.

---

## Princípios transversais

| Faixa | Sessão | Pontuação | Cronômetro | Competição / multiplayer |
|---|---|---|---|---|
| 0–1 | Extremamente curta | Não | Não | Não |
| 1–2 | Curta | Evitar | Não | Não |
| 2–4 | Curta | Opcional / suave | Não (default) | Não |
| 4–6 | Curta–média | Sim (leve) | Opcional | Não |
| 6–10 | Média | Sim | Opcional | Não (default) |
| 10+ / adultos | Flexível | Sim | Sim (opt-in) | Sim (online, opt-in) |

- Sons suaves; mute sempre acessível ao responsável.
- Alvos grandes; pouco ou nenhum texto obrigatório nas faixas baixas.
- Progresso = descoberta / continuidade, não ranking.

---

## 0–1 ano — Bebês (prioridade)

**Objetivo:** estimulação visual, auditiva e descoberta.

| Atividade | Ideia |
|---|---|
| Animais | Toque → animal grande + som característico suave |
| Sons | Pares causa → efeito auditivo |
| Objetos | Objetos do cotidiano, alto contraste |
| Cores | Campos de cor amplos; reação ao toque |
| Causa e efeito | Toque / balanço → animação curta |
| Música | Frases musicais curtas |
| Ritmo | Pulsos visuais + áudio alinhados, bem calmos |

**Não usar:** pontuação, cronômetros, competição, streaks, “game over”.

---

## 1–2 anos

Formas · Cores · Frutas · Animais · Partes do corpo · Grande × pequeno · Igual × diferente.

---

## 2–4 anos

Memória · Associação · Sequências · Primeiras palavras · Contagem · Quebra-cabeças simples.

---

## 4–6 anos

Alfabetização · Sílabas · Letras · Números · Soma · Subtração · Lógica.

---

## 6–10 anos

Geografia · História · Ciências · Sistema Solar · Inglês · Português · Matemática.

(Geografia MVP de estados já existe; esta faixa amarra o hub etário ao Motor de Geografia.)

---

## 10 anos até adultos

Estados · Capitais · Países · Bandeiras · Biomas · Oceanos · Montanhas · Rios · História · Ciências — com modos desafiadores e, depois, multiplayer online de mapas.

---

## Relação com a arquitetura

- Bebês / early years: novos módulos leves (não dependem da map-engine).
- 6+ e adultos: reutilizam map-engine, game-core e content packs.
- Perfis guardam `ageBand` para filtrar catálogo e desligar mecânicas inadequadas.

Ver também: [`03-target-audience.md`](03-target-audience.md), [`15-roadmap.md`](15-roadmap.md).
