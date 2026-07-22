# 01 — Overview

**Produto:** Aprendix  
**Primeiro módulo:** Motor de Geografia (nome comercial a definir)  
**Versão do GDD:** 0.1.0

---

## O que é

Aprendix é uma plataforma de desenvolvimento cognitivo composta por módulos educativos independentes sobre uma infraestrutura comum.

O primeiro módulo ensina geografia de forma interativa: o jogador identifica regiões em mapas (começando pelos estados do Brasil).

---

## Proposta de valor

| Para | Valor |
|---|---|
| Pais | Investimento no desenvolvimento cognitivo, sem anúncios nem pressão de compra para crianças |
| Crianças / jovens | Sessões curtas, feedback claro, evolução pessoal visível |
| Adultos | Desafios reais de conhecimento (estados, capitais, países…) |
| Escolas | Painel, progresso da turma, relatórios — licenciamento em escala |
| Desenvolvedor | Engine reutilizável: custo marginal baixo por novo módulo |

---

## Experiência em uma frase

Sessões curtas de prática geográfica em mapas interativos, com progresso medido contra você mesmo — sem ranking tóxico, sem anúncios, sem fricção comercial agressiva.

---

## Pilares de design

1. **Calma** — visual limpo, sons suaves, sem overload sensorial.
2. **Clareza** — cada modo tem um objetivo óbvio.
3. **Evolução** — histórico e estatísticas mostram melhora real.
4. **Modularidade** — novos mapas/modos = dados + configuração, não reescrita.
5. **Confiança** — monetização transparente, adequada a famílias e escolas.

---

## Escopo do MVP (Motor de Geografia)

Inclui:

- Mapa do Brasil (27 UFs) via `@federacao/react-brazil-map`
- Modos: Encontre a Região, Nomeie a Região, Treino
- Pontuação básica + histórico local
- Perfil único (local)
- Conteúdo gratuito: estados do Brasil

Fora do MVP (próximas fases):

- Assinatura / IAP / B2B escolas
- Continentes e países
- Capitais, biomas, drag-and-drop, desafio diário
- Conta na nuvem e múltiplos perfis

---

## Relação com a plataforma

```text
Aprendix (shell)
└── Módulo Geografia
    ├── Engine de mapas (genérica)
    ├── Adapter Brasil (@federacao/react-brazil-map)
    ├── Modos de jogo
    └── Conteúdo (datasets de regiões)
```

A engine de mapas **não** é específica do Brasil: o adapter nacional é o primeiro provider de geometria.
