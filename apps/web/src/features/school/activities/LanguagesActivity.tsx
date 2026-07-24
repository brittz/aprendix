import QuizActivity from '../../early-shared/QuizActivity';

const ITEMS = [
  {
    prompt: 'Como se diz “cachorro” em inglês?',
    answer: 'dog',
    options: ['dog', 'cat', 'bird', 'fish'],
  },
  {
    prompt: 'What is “house” in Portuguese?',
    answer: 'casa',
    options: ['casa', 'carro', 'mesa', 'livro'],
  },
  {
    prompt: 'Como se diz “água” em inglês?',
    answer: 'water',
    options: ['water', 'fire', 'earth', 'air'],
  },
  {
    prompt: 'What is “school” in Portuguese?',
    answer: 'escola',
    options: ['escola', 'praça', 'rua', 'cidade'],
  },
  {
    prompt: 'Como se diz “obrigado” em inglês?',
    answer: 'thank you',
    options: ['thank you', 'hello', 'goodbye', 'please'],
  },
  {
    prompt: 'What is “blue” in Portuguese?',
    answer: 'azul',
    options: ['azul', 'verde', 'vermelho', 'amarelo'],
  },
];

interface Props {
  onCorrect: () => void;
}

export default function LanguagesActivity({ onCorrect }: Props) {
  return (
    <QuizActivity items={ITEMS} onCorrect={onCorrect} label="Idiomas" />
  );
}
