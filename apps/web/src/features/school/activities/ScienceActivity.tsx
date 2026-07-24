import QuizActivity from '../../early-shared/QuizActivity';

const ITEMS = [
  {
    prompt: 'Qual é o planeta mais próximo do Sol?',
    answer: 'Mercúrio',
    options: ['Mercúrio', 'Vênus', 'Terra', 'Marte'],
  },
  {
    prompt: 'Quantos planetas existem no Sistema Solar?',
    answer: '8',
    options: ['8', '7', '9', '10'],
  },
  {
    prompt: 'Qual planeta é conhecido como o Planeta Vermelho?',
    answer: 'Marte',
    options: ['Marte', 'Júpiter', 'Saturno', 'Vênus'],
  },
  {
    prompt: 'A Terra é o … planeta a partir do Sol.',
    answer: '3º',
    options: ['3º', '2º', '4º', '5º'],
  },
  {
    prompt: 'Qual é o maior planeta do Sistema Solar?',
    answer: 'Júpiter',
    options: ['Júpiter', 'Saturno', 'Urano', 'Netuno'],
  },
  {
    prompt: 'O Sol é uma…',
    answer: 'estrela',
    options: ['estrela', 'planeta', 'lua', 'cometa'],
  },
];

interface Props {
  onCorrect: () => void;
}

export default function ScienceActivity({ onCorrect }: Props) {
  return (
    <QuizActivity items={ITEMS} onCorrect={onCorrect} label="Ciências" />
  );
}
