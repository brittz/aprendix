# 07 — UI / UX

## Direção

- Minimalista, limpa, pouca poluição visual.
- Uma ação principal por tela.
- Hierarquia tipográfica clara; áreas de toque generosas.
- Sem cards decorativos desnecessários no fluxo de jogo.

## Shell da plataforma

1. Home / módulos
2. Módulo (Geografia) → mapas e modos
3. Sessão de jogo (mapa em tela cheia útil)
4. Resultado / evolução
5. Perfil / estatísticas (secundário)

## Tela de jogo (Geografia)

- Mapa como âncora visual dominante.
- Prompt curto no topo (“Encontre Goiás”).
- Controles mínimos (pausar, sair, dica opcional no Treino).
- Feedback overlay leve — não cobrir o mapa por muito tempo.

## Responsividade

| Breakpoint | Comportamento |
|---|---|
| Mobile | Mapa full-width; prompt compacto; teclado só quando necessário |
| Tablet | Mapa maior; painel lateral opcional no resultado |
| Desktop | Mapa central; atalhos de teclado |

## Acessos rápidos

- Continuar última sessão
- Treino sugerido nas regiões com mais erro
- Desafio diário (quando existir)

## Tom visual (inicial)

Evitar clichês “edu-tech roxo brilhante”. Preferir paleta calma, contraste legível, estados de acerto/erro inequívocos sem neon agressivo. Tokens CSS definidos no app (`--ax-*`).
