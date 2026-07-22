import { useCallback, useMemo, useState } from 'react';
import { playPop, resumeBabyAudio } from '../audio/softAudio';

const PALETTE = ['#d96b5c', '#e6c65c', '#6faa7c', '#5b8fbf', '#e09555', '#8f7bb8'];

function randomBubble(seed: number) {
  return {
    id: `${seed}-${Math.random().toString(36).slice(2, 7)}`,
    left: 8 + Math.random() * 72,
    top: 10 + Math.random() * 65,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)]!,
  };
}

interface Props {
  onInteract: () => void;
}

export default function CauseEffectActivity({ onInteract }: Props) {
  const initial = useMemo(
    () => [0, 1, 2, 3].map((n) => randomBubble(n)),
    [],
  );
  const [bubbles, setBubbles] = useState(initial);
  const [popping, setPopping] = useState<string | null>(null);

  const onTap = useCallback(
    async (id: string) => {
      await resumeBabyAudio();
      playPop();
      setPopping(id);
      onInteract();
      window.setTimeout(() => {
        setBubbles((prev) => [
          ...prev.filter((b) => b.id !== id),
          randomBubble(Date.now()),
        ]);
        setPopping(null);
      }, 180);
    },
    [onInteract],
  );

  return (
    <div className="baby-stage" style={{ width: '100%', minHeight: 'min(60vh, 480px)' }}>
      {bubbles.map((bubble) => (
        <button
          key={bubble.id}
          type="button"
          className={`baby-bubble${popping === bubble.id ? ' is-pop' : ''}`}
          style={{
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            background: bubble.color,
          }}
          aria-label="bolha"
          onClick={() => void onTap(bubble.id)}
        />
      ))}
    </div>
  );
}
