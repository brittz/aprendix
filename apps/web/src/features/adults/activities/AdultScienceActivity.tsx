import QuizActivity from '../../early-shared/QuizActivity';

const ITEMS = [
  {
    prompt: 'Qual planeta tem o famoso sistema de anéis?',
    answer: 'Saturno',
    options: ['Saturno', 'Júpiter', 'Urano', 'Netuno'],
  },
  {
    prompt: 'A fotossíntese ocorre principalmente em…',
    answer: 'plantas',
    options: ['plantas', 'rochas', 'nuvens', 'vulcões'],
  },
  {
    prompt: 'A água ferve a … °C ao nível do mar.',
    answer: '100',
    options: ['100', '0', '37', '50'],
  },
  {
    prompt: 'Qual gás as plantas absorvem na fotossíntese?',
    answer: 'dióxido de carbono',
    options: ['dióxido de carbono', 'oxigênio', 'nitrogênio', 'hélio'],
  },
  {
    prompt: 'A Lua é um satélite natural da…',
    answer: 'Terra',
    options: ['Terra', 'Marte', 'Vênus', 'Júpiter'],
  },
];

interface Props {
  onCorrect: () => void;
}

export default function AdultScienceActivity({ onCorrect }: Props) {
  return (
    <QuizActivity items={ITEMS} onCorrect={onCorrect} label="Ciências" />
  );
}
