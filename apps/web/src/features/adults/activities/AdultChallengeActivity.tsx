import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

interface Problem {
  prompt: string;
  answer: number;
}

function makeProblem(): Problem {
  const kind = Math.floor(Math.random() * 4);
  if (kind === 0) {
    const a = 12 + Math.floor(Math.random() * 20);
    const b = 8 + Math.floor(Math.random() * 15);
    return { prompt: `${a} × ${b} = ?`, answer: a * b };
  }
  if (kind === 1) {
    const b = 3 + Math.floor(Math.random() * 9);
    const answer = 4 + Math.floor(Math.random() * 12);
    return { prompt: `${b * answer} ÷ ${b} = ?`, answer };
  }
  if (kind === 2) {
    const a = 40 + Math.floor(Math.random() * 60);
    const b = 15 + Math.floor(Math.random() * 30);
    return { prompt: `${a} − ${b} = ?`, answer: a - b };
  }
  const a = 25 + Math.floor(Math.random() * 50);
  const b = 20 + Math.floor(Math.random() * 40);
  return { prompt: `${a} + ${b} = ?`, answer: a + b };
}

interface Props {
  onCorrect: () => void;
}

export default function AdultChallengeActivity({ onCorrect }: Props) {
  const [problem, setProblem] = useState(() => makeProblem());
  const [pulse, setPulse] = useState<number | null>(null);

  const options = useMemo(() => {
    const wrong = new Set<number>();
    while (wrong.size < 3) {
      const n = Math.max(0, problem.answer + (Math.floor(Math.random() * 21) - 10));
      if (n !== problem.answer) wrong.add(n);
    }
    return [problem.answer, ...wrong].sort((a, b) => a - b);
  }, [problem]);

  const onTap = useCallback(
    async (value: number) => {
      await resumeBabyAudio();
      setPulse(value);
      if (value === problem.answer) {
        playPop();
        onCorrect();
        window.setTimeout(() => {
          setProblem(makeProblem());
          setPulse(null);
        }, 320);
      } else {
        playSoftBlip(1);
        window.setTimeout(() => setPulse(null), 180);
      }
    },
    [onCorrect, problem.answer],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="quiz-prompt">{problem.prompt}</p>
      <div className="quiz-options" role="group" aria-label="Desafio">
        {options.map((option) => (
          <button
            key={`${problem.prompt}-${option}`}
            type="button"
            className={`quiz-option${pulse === option ? ' is-pulse' : ''}${
              pulse === option && option === problem.answer ? ' is-correct' : ''
            }`}
            style={{ textAlign: 'center', fontSize: '1.25rem' }}
            onClick={() => void onTap(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
