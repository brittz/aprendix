# Aprendix — Documento de Visão

**Versão:** 0.1.0  
**Fase:** 1 (MVP Geografia) concluída → próxima: Fase 2  
**Posicionamento:** Plataforma de desenvolvimento cognitivo (não “apenas jogos educativos”).

---

## 1. Objetivo

Desenvolver uma plataforma de experiências educativas voltada ao desenvolvimento cognitivo de crianças, com desafios também para adolescentes e adultos.

Prioridades:

- aprendizado real
- experiência agradável e calma
- evolução contínua do conhecimento
- ausência de mecânicas viciantes ou excesso de estímulos

A plataforma é composta por módulos independentes que compartilham a mesma infraestrutura técnica.

---

## 2. Filosofia do Produto

### Princípios

- Aprender deve ser divertido.
- O jogador compete contra a própria evolução.
- Cada sessão deve ser curta.
- Interface limpa e minimalista.
- Pouca poluição visual.
- Sons suaves.
- Sem propagandas.
- Sem compras agressivas.
- Sem mecânicas de recompensa viciante.

Objetivo principal: transformar curiosidade em conhecimento.

### Posicionamento de marca

Em vez de vender “jogos educativos”, vendemos uma **plataforma de desenvolvimento cognitivo**.

| Quando o pai vê… | Ele pensa… |
|---|---|
| “jogo” | entretenimento |
| “plataforma de desenvolvimento” | investimento na educação |

Esse posicionamento abre portas para escolas, clínicas, psicopedagogos e terapeutas.

---

## 3. Público-Alvo

| Faixa | Foco | Restrições |
|---|---|---|
| Bebês (0–1) | Estimulação visual/auditiva, causa e efeito | Sem pontuação, cronômetro ou competição; sessões mínimas |
| 1–2 anos | Formas, cores, frutas, animais, grande/pequeno | Sessões curtas |
| 2–4 anos | Memória, associação, sequências, contagem | — |
| 4–6 anos | Alfabetização, sílabas, números, soma/subtração | — |
| 6–10 anos | Geografia, história, ciências, idiomas, matemática | — |
| 10+ / adultos | Desafios completos (estados, capitais, países…) | — |

---

## 4. Estrutura da Plataforma

```text
Aprendix
├── Letras
├── Matemática
├── Geografia          ← primeiro módulo (Motor de Geografia)
├── História
├── Ciências
├── Inglês
├── Música
├── Animais
├── Corpo Humano
├── Memória
├── Lógica
└── Quebra-cabeças
```

Infraestrutura compartilhada:

- autenticação e perfis
- progresso e estatísticas
- sistema de pontuação
- componentes visuais
- engines de conteúdo (mapas, quizzes, etc.)
- armazenamento e acessibilidade

---

## 5. Conceito de Progressão

Foco: competir contra si mesmo.

> Hoje você acertou 18 estados.  
> Uma semana depois: agora você acerta 25.

A evolução do usuário deve ser sempre visível e compreensível.

---

## 6. Primeiro Módulo

**Nome provisório:** Motor de Geografia  
**Escopo inicial:** estados do Brasil (via `@federacao/react-brazil-map`).  
**Expansão:** continentes → países → capitais → biomas → rios → etc., reutilizando a mesma engine genérica de mapas.

Detalhes em `docs/gdd/`.

---

## 7. Monetização (camadas)

Princípio: **não monetizar com anúncios**. Anúncios e mecânicas dark-pattern vão contra a proposta e destroem a confiança dos pais.

### Camada 1 — Gratuita

Acesso a uma fatia do conteúdo para conhecer a plataforma:

- Letras / Números (amostra)
- Estados do Brasil
- Alguns quebra-cabeças
- Algumas atividades para bebês

### Camada 2 — Assinatura

Libera:

- todos os jogos e conteúdos
- novos conteúdos mensais
- estatísticas completas
- progresso ilimitado
- múltiplos perfis (filhos)
- desafios especiais

Preços de referência:

- R$ 14,90 / mês
- R$ 99,90 / ano

### Camada 3 — Compra única de módulos

Para quem rejeita assinatura:

- Pacote Geografia
- Pacote Matemática
- Pacote Ciências

### Camada 4 — Escolas (prioridade estratégica)

Licenças para dezenas/centenas de alunos:

- painel do professor
- progresso da turma
- atividades
- ranking por evolução (não por competição)
- exportação de relatórios

### Camada 5 — Empresas

Treinamento corporativo (geografia, idiomas, lógica, memória) reaproveitando a mesma stack.

### Camada 6 — Conteúdo oficial / coleções

Mapas oficiais, novos países, cursos, coleções especiais.

### O que evitamos

- anúncios e vídeos obrigatórios
- energia que acaba / “espere 30 minutos”
- moedas premium, loot boxes, mecânicas de cassino
- compras direcionadas a crianças

Detalhes em `docs/gdd/06-economy.md`.

---

## 8. Visão de Longo Prazo

Não construir um jogo isolado de geografia — construir um **engine educacional**.

Cada novo módulo (geografia, matemática, leitura, memória, idiomas, ciências) reaproveita a mesma infraestrutura, reduzindo custo e fazendo o valor da plataforma crescer de forma cumulativa.

---

## 9. Requisitos Não Funcionais

- Interface responsiva (desktop, tablet, celular)
- Navegação por teclado e touch
- Alto desempenho
- Componentização e testabilidade
- Internacionalização desde o início
- Facilidade para adicionar novos módulos
- Web primeiro; depois Android e iOS (híbrido)

---

## Documentação relacionada

| Área | Caminho |
|---|---|
| Game Design | `docs/gdd/` |
| Arquitetura técnica | `docs/tech/` |
| Roadmap | `docs/gdd/15-roadmap.md` |
