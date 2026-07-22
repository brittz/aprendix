import { useCallback, useMemo, useState } from 'react';
import { playSoftBlip, resumeBabyAudio } from '../../babies/audio/softAudio';

const PAIRS = [
  { same: true, left: '#22c55e', right: '#22c55e' },
  { same: false, left: '#ef4444', right: '#3b82f6' },
  { same: true, left: '#f59e0b', right: '#f59e0b' },
  { same: false, left: '#8b5cf6', right: '#14b8a6' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function SameDiffActivity({ onInteract }: Props) {
  const [index, setIndex] = useState(0);
  const [pulse, setPulse] = useState<'same' | 'diff' | null>(null);
  const pair = useMemo(() => PAIRS[index % PAIRS.length]!, [index]);

  const onTap = useCallback(
    async (choice: 'same' | 'diff') => {
      await resumeBabyAudio();
      const correct =
        (choice === 'same' && pair.same) || (choice === 'diff' && !pair.same);
      playSoftBlip(correct ? 5 : 1);
      setPulse(choice);
      if (correct) {
        onInteract();
        window.setTimeout(() => {
          setPulse(null);
          setIndex((n) => n + 1);
        }, 280);
      } else {
        window.setTimeout(() => setPulse(null), 180);
      }
    },
    [onInteract, pair.same],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="toddler-prompt">São iguais ou diferentes?</p>
      <div className="toddler-pair" style={{ marginBottom: '1.25rem' }}>
        <div
          aria-hidden
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            background: pair.left,
          }}
        />
        <div
          aria-hidden
          style={{
            width: 96,
            height: 96,
            borderRadius: 20,
            background: pair.right,
          }}
        />
      </div>
      <div className="toddler-pair">
        <button
          type="button"
          className={`ax-card toddler-target${pulse === 'same' ? ' is-pulse' : ''}`}
          style={{
            minHeight: 64,
            aspectRatio: 'auto',
            width: 140,
            background: '#eeebff',
            color: '#6a5ae0',
          }}
          onClick={() => void onTap('same')}
        >
          Iguais
        </button>
        <button
          type="button"
          className={`ax-card toddler-target${pulse === 'diff' ? ' is-pulse' : ''}`}
          style={{
            minHeight: 64,
            aspectRatio: 'auto',
            width: 140,
            background: '#fff7ed',
            color: '#c2410c',
          }}
          onClick={() => void onTap('diff')}
        >
          Diferentes
        </button>
      </div>
    </div>
  );
}
