import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

interface Props {
  onCorrect: () => void;
}

export default function NumbersActivity({ onCorrect }: Props) {
  const [target, setTarget] = useState(3);
  const [pulse, setPulse] = useState<number | null>(null);

  const options = useMemo(() => {
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => n !== target);
    const mix = [target, pool[0]!, pool[1]!, pool[2]!];
    return mix.sort(() => Math.random() - 0.5);
  }, [target]);

  const nextRound = useCallback(() => {
    setTarget(1 + Math.floor(Math.random() * 9));
    setPulse(null);
  }, []);

  const onTap = useCallback(
    async (value: number) => {
      await resumeBabyAudio();
      setPulse(value);
      if (value === target) {
        playPop();
        onCorrect();
        window.setTimeout(nextRound, 320);
      } else {
        playSoftBlip(1);
        window.setTimeout(() => setPulse(null), 180);
      }
    },
    [nextRound, onCorrect, target],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="junior-prompt">Quantos pontos?</p>
      <div className="junior-dots" aria-hidden>
        {Array.from({ length: target }, (_, i) => (
          <span key={i} className="junior-dot" />
        ))}
      </div>
      <div className="junior-grid" role="group" aria-label="Números">
        {options.map((option) => (
          <button
            key={`${target}-${option}`}
            type="button"
            className={`junior-tile${pulse === option ? ' is-pulse' : ''}${
              pulse === option && option === target ? ' is-correct' : ''
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
