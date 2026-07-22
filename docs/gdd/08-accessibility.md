# 08 — Acessibilidade

## Requisitos

- Navegação por teclado no desktop (Tab, Enter, Esc, setas onde fizer sentido).
- Alvos de toque ≥ 44×44 px.
- Contraste adequado (WCAG AA como meta).
- Não depender só de cor para acerto/erro (ícone + texto + som opcional).
- Textos via i18n; evitar texto em imagem.
- Redução de movimento: respeitar `prefers-reduced-motion`.
- Sons desligáveis globalmente e por perfil.

## Mapa

- Região focável / anunciável quando possível (nome da UF).
- Alternativa ao mapa puro: lista de regiões + destaque no mapa (modo acessível).
- Zoom/pan não podem ser o único caminho para jogar no mobile.

## Perfis infantis / bebês

- Sem dependência de leitura nas faixas mais baixas (outros módulos).
- Geografia: nomes falados (TTS) como opção futura.

## Testes

- Checklist manual por release (teclado, leitor de tela smoke, contraste).
- Automatizar o que for viável (lint a11y, testes de foco).
