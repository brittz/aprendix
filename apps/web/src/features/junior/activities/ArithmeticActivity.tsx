import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

interface Problem {
  a: number;
  b: number;
  op: '+' | '-';
  answer: number;
}

function makeProblem(): Problem {
  const op = Math.random() > 0.45 ? '+' : '-';
  if (op === '+') {
    const a = 1 + Math.floor(Math.random() * 5);
    const b = 1 + Math.floor(Math.random() * 4);
    return { a, b, op, answer: a + b };
  }
  const a = 3 + Math.floor(Math.random() * 6);
  const b = 1 + Math.floor(Math.random() * Math.min(4, a - 1));
  return { a, b, op, answer: a - b };
}

interface Props {
  onCorrect: () => void;
}

export default function ArithmeticActivity({ onCorrect }: Props) {
  const [problem, setProblem] = useState(() => makeProblem());
  const [pulse, setPulse] = useState<number | null>(null);

  const options = useMemo(() => {
    const wrong = new Set<number>();
    while (wrong.size < 3) {
      const n = Math.max(0, problem.answer + (Math.floor(Math.random() * 7) - 3));
      if (n !== problem.answer) wrong.add(n);
    }
    return [problem.answer, ...wrong].sort(() => Math.random() - 0.5);
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
      <p className="junior-prompt">
        {problem.a} {problem.op} {problem.b} = ?
      </p>
      <div className="junior-dots" aria-hidden>
        {Array.from({ length: problem.a }, (_, i) => (
          <span key={`a-${i}`} className="junior-dot" />
        ))}
      </div>
      <p className="junior-subprompt">
        {problem.op === '+' ? 'junte' : 'tire'} {problem.b}
      </p>
      <div className="junior-choice-row" role="group" aria-label="Contas">
        {options.map((option) => (
          <button
            key={`${problem.a}${problem.op}${problem.b}-${option}`}
            type="button"
            className={`junior-tile${pulse === option ? ' is-pulse' : ''}${
              pulse === option && option === problem.answer ? ' is-correct' : ''
            }`}
            style={{
              width: 72,
              height: 72,
              minHeight: 72,
              aspectRatio: 'auto',
            }}
            onClick={() => void onTap(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
