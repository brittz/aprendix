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

## Fase 1 — MVP Geografia (web) ← atual

- [ ] Engine de mapas genérica (contratos + adapter Brasil)
- [ ] Modos: Treino, Encontre a Região, Nomeie a Região
- [ ] Pontuação + histórico local
- [ ] Tela de evolução (“18 → 25”)
- [ ] UI responsiva (mobile/desktop)
- [ ] i18n preparado (PT-BR primeiro)
- [ ] Conteúdo free: 27 estados

## Fase 2 — Qualidade e mobile

- [ ] Acessibilidade (teclado, contraste, reduced motion)
- [ ] Áudio suave + mute
- [ ] Build Capacitor Android / iOS
- [ ] Testes unitários da engine e modos
- [ ] Estatísticas por região (erros frequentes)

## Fase 3 — Modos e conteúdo

- [ ] Capitais
- [ ] Contra o Tempo / Sobrevivência (flags por idade)
- [ ] Arrastar e soltar
- [ ] Desafio diário
- [ ] Segundo mapa (ex.: América do Sul)

## Fase 4 — Contas e monetização B2C

- [ ] Autenticação + sync de progresso
- [ ] Múltiplos perfis
- [ ] Assinatura (R$ 14,90 / R$ 99,90)
- [ ] Compra avulsa Pacote Geografia
- [ ] Parental gate em compras

## Fase 5 — Escolas (B2B)

- [ ] Painel do professor
- [ ] Turmas, atividades, relatórios
- [ ] Ranking por evolução
- [ ] Licenciamento institucional

## Fase 6 — Plataforma

- [ ] Segundo módulo educativo (ex.: Matemática ou Memória)
- [ ] Catálogo de módulos na home
- [ ] Expansões: mundo, biomas, bandeiras
- [ ] Camada empresas / coleções oficiais

---

## Prioridade explícita

1. Engine reutilizável + MVP BR web  
2. Confiança (UX calma, free útil, sem dark patterns)  
3. Mobile híbrido  
4. Assinatura / módulos  
5. Escolas (maior potencial de receita agregada)

## Fora de roadmap (não fazer)

- Anúncios
- Energia / timers de espera
- Loot boxes / moedas premium infantis
- Competição tóxica como motor de retenção
