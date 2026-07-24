import QuizActivity from '../../early-shared/QuizActivity';

const ITEMS = [
  {
    prompt: 'Em que ano o Brasil proclamou a Independência?',
    answer: '1822',
    options: ['1822', '1500', '1889', '1808'],
  },
  {
    prompt: 'Quem foi o primeiro presidente do Brasil?',
    answer: 'Deodoro da Fonseca',
    options: [
      'Deodoro da Fonseca',
      'Dom Pedro I',
      'Getúlio Vargas',
      'Tiradentes',
    ],
  },
  {
    prompt: 'A capital do Brasil hoje é…',
    answer: 'Brasília',
    options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
  },
  {
    prompt: 'A abolição da escravidão no Brasil foi em…',
    answer: '1888',
    options: ['1888', '1822', '1889', '1500'],
  },
  {
    prompt: 'Dom Pedro I proclamou a Independência às margens do rio…',
    answer: 'Ipiranga',
    options: ['Ipiranga', 'Amazonas', 'São Francisco', 'Tietê'],
  },
];

interface Props {
  onCorrect: () => void;
}

export default function HistoryActivity({ onCorrect }: Props) {
  return <QuizActivity items={ITEMS} onCorrect={onCorrect} label="História" />;
}
