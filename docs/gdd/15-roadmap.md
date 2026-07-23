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

## Fase 2 — Jogos por faixa etária ← atual (2.3 feito; seguir 2.4+)

Catálogo cognitivo por idade. Detalhes: [`17-age-bands.md`](17-age-bands.md).  
**Próximo: crianças 4–6 anos.**

### 2.1 — Bebês (0–1 ano) — prioridade

Objetivo: estimulação visual, auditiva e descoberta.

- [x] Shell de módulo “Primeiros estímulos” (sessões extremamente curtas)
- [x] Regras de faixa: **sem pontuação, sem cronômetro, sem competição**
- [x] Atividade: Animais (toque → som + forma grande)
- [x] Atividade: Sons (causa e efeito auditivo)
- [x] Atividade: Objetos
- [x] Atividade: Cores
- [x] Atividade: Causa e efeito (toque → reação suave)
- [x] Atividade: Música e ritmo (loops/frases curtas, mute fácil)
- [x] Entrada “bebê” na home (alvos grandes, texto só para o responsável)
- [x] Amostra free das atividades desta faixa (`packages/early-years`)

### 2.2 — Crianças (1–2 anos)

- [x] Formas
- [x] Cores (extensão)
- [x] Frutas
- [x] Animais (extensão)
- [x] Partes do corpo
- [x] Grande × pequeno
- [x] Igual × diferente
- [x] Shell “Descobertas 1–2” + regras sem score/timer/competição
- [x] Entrada na home / jogos (`/toddlers`)

### 2.3 — Crianças (2–4 anos)

- [x] Memória
- [x] Associação
- [x] Sequências
- [x] Primeiras palavras
- [x] Contagem
- [x] Quebra-cabeças simples
- [x] Shell “Explorar 2–4” + regras sem score/timer/competição
- [x] Entrada na home / jogos (`/preschool`)

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
