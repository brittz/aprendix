import QuizActivity from '../../early-shared/QuizActivity';

const ITEMS = [
  {
    prompt: 'A Proclamação da República no Brasil ocorreu em…',
    answer: '1889',
    options: ['1889', '1822', '1888', '1930'],
  },
  {
    prompt: 'Qual tratado fixou boa parte das fronteiras coloniais na América?',
    answer: 'Tratado de Tordesilhas',
    options: [
      'Tratado de Tordesilhas',
      'Tratado de Versalhes',
      'Tratado de Madri',
      'Tratado de Petrópolis',
    ],
  },
  {
    prompt: 'A capital do Império do Brasil era…',
    answer: 'Rio de Janeiro',
    options: ['Rio de Janeiro', 'Brasília', 'Salvador', 'São Paulo'],
  },
  {
    prompt: 'Quem liderou a Inconfidência Mineira?',
    answer: 'Tiradentes',
    options: ['Tiradentes', 'Dom Pedro II', 'José Bonifácio', 'Mauá'],
  },
  {
    prompt: 'O Brasil foi colônia de qual país europeu?',
    answer: 'Portugal',
    options: ['Portugal', 'Espanha', 'França', 'Inglaterra'],
  },
];

interface Props {
  onCorrect: () => void;
}

export default function AdultHistoryActivity({ onCorrect }: Props) {
  return <QuizActivity items={ITEMS} onCorrect={onCorrect} label="História" />;
}
