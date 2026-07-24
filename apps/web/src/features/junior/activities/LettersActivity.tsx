import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

const LETTERS = ['A', 'E', 'I', 'O', 'U', 'M', 'P', 'S', 'T', 'L'] as const;
const SYLLABLES = ['MA', 'PA', 'SA', 'LA', 'TO', 'MI', 'PE', 'SO'] as const;

interface Props {
  onCorrect: () => void;
}

export default function LettersActivity({ onCorrect }: Props) {
  const [mode, setMode] = useState<'letter' | 'syllable'>('letter');
  const [target, setTarget] = useState<string>(LETTERS[0]!);
  const [pulse, setPulse] = useState<string | null>(null);

  const pool = mode === 'letter' ? LETTERS : SYLLABLES;

  const options = useMemo(() => {
    const rest = pool.filter((item) => item !== target);
    const mix = [target, rest[0]!, rest[1]!, rest[2]!];
    return mix.sort(() => Math.random() - 0.5);
  }, [pool, target]);

  const nextRound = useCallback(() => {
    const nextMode = Math.random() > 0.45 ? 'letter' : 'syllable';
    const nextPool = nextMode === 'letter' ? LETTERS : SYLLABLES;
    setMode(nextMode);
    setTarget(nextPool[Math.floor(Math.random() * nextPool.length)]!);
    setPulse(null);
  }, []);

  const onTap = useCallback(
    async (value: string) => {
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
      <p className="junior-prompt">
        {mode === 'letter' ? 'Encontre a letra' : 'Encontre a sílaba'}
      </p>
      <p className="junior-subprompt">{target}</p>
      <div className="junior-grid" role="group" aria-label="Letras">
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
