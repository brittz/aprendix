# 15 — Roadmap

Visão em fases. Datas são ordenação relativa, não compromisso de calendário.

---

## Fase 0 — Fundação

- [x] Documento de visão
- [x] GDD inicial
- [x] Docs técnicas (arquitetura / stack)
- [x] Repositório Git
- [x] Scaffold Ionic React + Capacitor (`apps/web`)
- [x] Integração `@federacao/react-brazil-map` (`packages/react-brazil-map` + smoke `/geography/map`)
- [x] CI básico / lint (GitHub Actions)

## Fase 1 — MVP Geografia (web)

- [x] Engine de mapas genérica (contratos + adapter Brasil)
- [x] Modos: Treino, Encontre a Região, Nomeie a Região
- [x] Pontuação + histórico local
- [x] Tela de evolução (“18 → 25”)
- [x] UI responsiva (mobile/desktop)
- [x] i18n preparado (PT-BR primeiro)
- [x] Conteúdo free: 27 estados
- [x] Contratos multijogador (sem implementação) + GDD `16-multiplayer.md`

## Fase 2 — Jogos por faixa etária ← atual

Catálogo cognitivo por idade. Detalhes: [`17-age-bands.md`](17-age-bands.md).  
**Prioridade de implementação: bebês (0–1 ano).**

### 2.1 — Bebês (0–1 ano) — prioridade

Objetivo: estimulação visual, auditiva e descoberta.

- [ ] Shell de módulo “Primeiros estímulos” (sessões extremamente curtas)
- [ ] Regras de faixa: **sem pontuação, sem cronômetro, sem competição**
- [ ] Atividade: Animais (toque → som + imagem grande)
- [ ] Atividade: Sons (causa e efeito auditivo)
- [ ] Atividade: Objetos do cotidiano
- [ ] Atividade: Cores
- [ ] Atividade: Causa e efeito (toque → reação suave)
- [ ] Atividade: Música e ritmo (loops curtos, mute fácil)
- [ ] Perfil / preset “bebê” na navegação (alvos grandes, zero texto obrigatório)
- [ ] Amostra free de 1–2 atividades desta faixa

### 2.2 — Crianças (1–2 anos)

- [ ] Formas
- [ ] Cores (extensão)
- [ ] Frutas
- [ ] Animais (extensão)
- [ ] Partes do corpo
- [ ] Grande × pequeno
- [ ] Igual × diferente

### 2.3 — Crianças (2–4 anos)

- [ ] Memória
- [ ] Associação
- [ ] Sequências
- [ ] Primeiras palavras
- [ ] Contagem
- [ ] Quebra-cabeças simples

### 2.4 — Crianças (4–6 anos)

- [ ] Alfabetização / letras / sílabas
- [ ] Números
- [ ] Soma e subtração introdutórias
- [ ] Lógica simples

### 2.5 — Crianças (6–10 anos)

- [ ] Geografia (além do MVP de estados — integração com módulos etários)
- [ ] História
- [ ] Ciências / Sistema Solar
- [ ] Inglês e Português
- [ ] Matemática

### 2.6 — 10 anos até adultos

Jogos mais completos e desafiadores (muitos já nascem no Motor de Geografia e expansões):

- [ ] Estados, capitais, países, bandeiras
- [ ] Biomas, oceanos, montanhas, rios
- [ ] História e ciências em profundidade
- [ ] Modos de pressão opcionais (tempo / sobrevivência) — nunca default em faixas baixas

## Fase 3 — Qualidade e mobile

- [ ] Acessibilidade (teclado, contraste, reduced motion)
- [ ] Áudio suave + mute (base compartilhada com faixa bebê)
- [ ] Build Capacitor Android / iOS
- [ ] Testes unitários da engine e modos
- [ ] Estatísticas por região (erros frequentes)

## Fase 4 — Modos e conteúdo (Geografia)

- [ ] Capitais (nova fase no mesmo mapa BR)
- [ ] Contra o Tempo / Sobrevivência (flags por idade)
- [ ] Arrastar e soltar
- [ ] Desafio diário
- [ ] Segundo mapa/fase (ex.: América do Sul ou biomas)

## Fase 5 — Contas e monetização B2C

- [ ] Autenticação + sync de progresso
- [ ] Múltiplos perfis (com faixa etária)
- [ ] Assinatura (R$ 14,90 / R$ 99,90)
- [ ] Compra avulsa Pacote Geografia / pacotes etários
- [ ] Parental gate em compras

## Fase 6 — Escolas (B2B)

- [ ] Painel do professor
- [ ] Turmas, atividades, relatórios
- [ ] Ranking por evolução
- [ ] Licenciamento institucional

## Fase 7 — Multijogador online (mapas)

- [ ] Matchmaking / salas
- [ ] Modo Claim (1 região por turno + timer)
- [ ] Sincronização authoritative + anti-cheat básico de turno
- [ ] Cores/posse no mapa por jogador
- [ ] Resultado “quem conhece mais o mapa”
- [ ] Gate: só com conta; **desligado por padrão em perfis 0–6**
- Detalhes: [`16-multiplayer.md`](16-multiplayer.md)

## Fase 8 — Plataforma

- [ ] Catálogo unificado por módulo e por faixa etária
- [ ] Expansões: mundo, biomas, bandeiras, mapas fictícios
- [ ] Camada empresas / coleções oficiais
- [ ] Atividades para clínicas / psicopedagogia (opcional)

---

## Prioridade explícita

1. Engine reutilizável + MVP BR web  
2. **Jogos por faixa etária — começar por bebês (0–1)**  
3. Confiança (UX calma, free útil, sem dark patterns)  
4. Mobile híbrido  
5. Assinatura / módulos  
6. Escolas  
7. Multijogador online (mapas; nunca em bebês)

## Fora de roadmap (não fazer)

- Anúncios
- Energia / timers de espera
- Loot boxes / moedas premium infantis
- Competição tóxica como motor de retenção
- Multijogador que ignore o conteúdo (só velocidade vazia)
- Pontuação, cronômetro ou competição na faixa 0–1
