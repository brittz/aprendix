import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../babies/audio/softAudio';

export interface QuizItem {
  prompt: string;
  answer: string;
  options: string[];
}

interface Props {
  items: QuizItem[];
  onCorrect: () => void;
  label: string;
}

export default function QuizActivity({ items, onCorrect, label }: Props) {
  const [index, setIndex] = useState(0);
  const [pulse, setPulse] = useState<string | null>(null);
  const item = items[index % items.length]!;

  const options = useMemo(
    () => [...item.options].sort(() => Math.random() - 0.5),
    [item],
  );

  const onTap = useCallback(
    async (value: string) => {
      await resumeBabyAudio();
      setPulse(value);
      if (value === item.answer) {
        playPop();
        onCorrect();
        window.setTimeout(() => {
          setPulse(null);
          setIndex((n) => n + 1);
        }, 320);
      } else {
        playSoftBlip(1);
        window.setTimeout(() => setPulse(null), 180);
      }
    },
    [item.answer, onCorrect],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="quiz-prompt">{item.prompt}</p>
      <div className="quiz-options" role="group" aria-label={label}>
        {options.map((option) => (
          <button
            key={`${index}-${option}`}
            type="button"
            className={`quiz-option${pulse === option ? ' is-pulse' : ''}${
              pulse === option && option === item.answer ? ' is-correct' : ''
            }`}
            onClick={() => void onTap(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
