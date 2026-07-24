import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

const SEQUENCES = [
  { show: ['▲', '●', '▲'], answer: '●', options: ['●', '■', '▲'] },
  { show: ['1', '2', '3'], answer: '4', options: ['4', '5', '2'] },
  { show: ['A', 'B', 'C'], answer: 'D', options: ['D', 'E', 'A'] },
  { show: ['●', '●', '▲'], answer: '▲', options: ['▲', '■', '●'] },
  { show: ['2', '4', '6'], answer: '8', options: ['8', '7', '5'] },
] as const;

interface Props {
  onCorrect: () => void;
}

export default function LogicActivity({ onCorrect }: Props) {
  const [index, setIndex] = useState(0);
  const [pulse, setPulse] = useState<string | null>(null);
  const item = SEQUENCES[index % SEQUENCES.length]!;

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
      <p className="junior-prompt">O que vem depois?</p>
      <div className="junior-choice-row" style={{ marginBottom: '1rem' }} aria-hidden>
        {item.show.map((token, i) => (
          <span
            key={`${token}-${i}`}
            className="junior-tile"
            style={{
              width: 56,
              height: 56,
              minHeight: 56,
              aspectRatio: 'auto',
              cursor: 'default',
              fontSize: '1.35rem',
            }}
          >
            {token}
          </span>
        ))}
        <span
          className="junior-tile"
          style={{
            width: 56,
            height: 56,
            minHeight: 56,
            aspectRatio: 'auto',
            cursor: 'default',
            background: '#fef3c7',
          }}
        >
          ?
        </span>
      </div>
      <div className="junior-choice-row" role="group" aria-label="Lógica">
        {options.map((option) => (
          <button
            key={`${index}-${option}`}
            type="button"
            className={`junior-tile${pulse === option ? ' is-pulse' : ''}${
              pulse === option && option === item.answer ? ' is-correct' : ''
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
