import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

const WORDS = [
  { id: 'cat', label: 'GATO', color: '#f0c987' },
  { id: 'ball', label: 'BOLA', color: '#86efac' },
  { id: 'house', label: 'CASA', color: '#93c5fd' },
  { id: 'sun', label: 'SOL', color: '#fde047' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function WordsActivity({ onInteract }: Props) {
  const [index, setIndex] = useState(0);
  const [pulse, setPulse] = useState<string | null>(null);
  const target = WORDS[index % WORDS.length]!;

  const options = useMemo(() => {
    const rest = WORDS.filter((w) => w.id !== target.id);
    return [target, rest[0]!, rest[1]!].sort(() => Math.random() - 0.5);
  }, [target]);

  const onTap = useCallback(
    async (id: string) => {
      await resumeBabyAudio();
      setPulse(id);
      if (id === target.id) {
        playPop();
        onInteract();
        window.setTimeout(() => {
          setPulse(null);
          setIndex((n) => n + 1);
        }, 320);
      } else {
        playSoftBlip(1);
        window.setTimeout(() => setPulse(null), 180);
      }
    },
    [onInteract, target.id],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="preschool-prompt">Toque em: {target.label}</p>
      <div className="preschool-grid" role="group" aria-label="Palavras">
        {options.map((word) => (
          <button
            key={`${target.id}-${word.id}`}
            type="button"
            className={`preschool-tile${pulse === word.id ? ' is-pulse' : ''}${
              pulse === word.id && word.id === target.id ? ' is-correct' : ''
            }`}
            style={{ background: word.color }}
            aria-label={word.label}
            onClick={() => void onTap(word.id)}
          >
            {word.label}
          </button>
        ))}
      </div>
    </div>
  );
}
