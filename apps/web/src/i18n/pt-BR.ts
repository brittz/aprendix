export const ptBR = {
  'app.name': 'Aprendix',
  'app.tagline': 'Desenvolvimento cognitivo, com calma.',
  'home.lede':
    'Plataforma modular de aprendizado. Comece pelo Motor de Geografia — estados do Brasil.',
  'home.cta.geography': 'Geografia',
  'home.note': 'Conteúdo gratuito: 27 estados do Brasil.',

  'geo.title': 'Geografia',
  'geo.pickPhase': 'Escolha uma fase',
  'geo.pickMode': 'Escolha um modo',
  'geo.evolution': 'Sua evolução',
  'geo.evolution.empty': 'Jogue uma partida para ver sua evolução.',
  'geo.evolution.line': 'Você acertava {{before}} · agora {{after}}',
  'geo.evolution.best': 'Melhor marca: {{count}} regiões',
  'geo.sessions': '{{count}} partidas',
  'geo.free': 'Gratuito',
  'geo.start': 'Jogar',
  'geo.back': 'Voltar',
  'geo.multiplayer.soon':
    'Multijogador online em breve: reivindique regiões por turnos e veja quem conhece mais o mapa.',

  'phases.brStates.title': 'Estados do Brasil',
  'phases.brStates.description':
    'Identifique as 27 unidades federativas no mapa. Ideal para começar.',

  'modes.train.name': 'Treino',
  'modes.train.description': 'Sem pontuação e sem pressão. Só aprendizado.',
  'modes.find.name': 'Encontre a região',
  'modes.find.description': 'Mostramos o nome — você toca no mapa.',
  'modes.name.name': 'Nomeie a região',
  'modes.name.description': 'Destacamos a região — você digita o nome.',

  'play.progress': '{{current}} / {{total}}',
  'play.find.prompt': 'Encontre {{name}}',
  'play.name.prompt': 'Qual o nome desta região?',
  'play.name.placeholder': 'Digite o nome',
  'play.name.submit': 'Confirmar',
  'play.score': 'Pontos: {{score}}',
  'play.streak': 'Sequência: {{streak}}',
  'play.feedback.correct': 'Correto!',
  'play.feedback.wrong': 'Era {{name}}',
  'play.feedback.continue': 'Continuar',
  'play.loading': 'Carregando mapa…',
  'play.error': 'Não foi possível carregar o mapa.',
  'play.exit': 'Sair',

  'results.title': 'Resultado',
  'results.correct': '{{correct}} de {{total}} corretos',
  'results.accuracy': '{{percent}}% de acerto',
  'results.score': 'Pontuação: {{score}}',
  'results.streak': 'Maior sequência: {{streak}}',
  'results.evolution': 'Evolução',
  'results.evolution.detail': '{{before}} → {{after}} regiões',
  'results.evolution.first': 'Primeira marca: {{after}} regiões',
  'results.again': 'Jogar de novo',
  'results.modes': 'Outros modos',
  'results.home': 'Início',
} as const;

export type MessageKey = keyof typeof ptBR;
export type Messages = Record<MessageKey, string>;
