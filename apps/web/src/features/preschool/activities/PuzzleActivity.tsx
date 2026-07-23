import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

const PIECES = [
  { id: 0, color: '#6a5ae0' },
  { id: 1, color: '#22c55e' },
  { id: 2, color: '#f59e0b' },
] as const;

interface Props {
  onInteract: () => void;
}

function shuffleIds() {
  return [...PIECES.map((p) => p.id)].sort(() => Math.random() - 0.5);
}

export default function PuzzleActivity({ onInteract }: Props) {
  const [order, setOrder] = useState(() => shuffleIds());
  const [selected, setSelected] = useState<number | null>(null);
  const [pulse, setPulse] = useState<number | null>(null);

  const solved = useMemo(
    () => order.every((id, index) => id === index),
    [order],
  );

  const onTap = useCallback(
    async (index: number) => {
      await resumeBabyAudio();
      setPulse(index);

      if (selected === null) {
        playSoftBlip(2);
        setSelected(index);
        window.setTimeout(() => setPulse(null), 160);
        return;
      }

      if (selected === index) {
        setSelected(null);
        setPulse(null);
        return;
      }

      const next = [...order];
      const tmp = next[selected]!;
      next[selected] = next[index]!;
      next[index] = tmp;
      setOrder(next);
      setSelected(null);

      const done = next.every((id, i) => id === i);
      if (done) {
        playPop();
        onInteract();
        window.setTimeout(() => {
          setOrder(shuffleIds());
          setPulse(null);
        }, 500);
      } else {
        playSoftBlip(3);
        window.setTimeout(() => setPulse(null), 160);
      }
    },
    [onInteract, order, selected],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="preschool-prompt">
        {solved ? 'Muito bem!' : 'Organize as cores'}
      </p>
      <div className="preschool-pair" style={{ marginBottom: '0.75rem' }} aria-hidden>
        {PIECES.map((piece) => (
          <div
            key={`goal-${piece.id}`}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: piece.color,
              opacity: 0.55,
            }}
          />
        ))}
      </div>
      <div className="preschool-choice-row" role="group" aria-label="Quebra-cabeça">
        {order.map((pieceId, index) => {
          const piece = PIECES.find((p) => p.id === pieceId)!;
          return (
            <button
              key={`${pieceId}-${index}`}
              type="button"
              className={`preschool-tile${pulse === index ? ' is-pulse' : ''}${
                selected === index ? ' is-correct' : ''
              }`}
              style={{
                background: piece.color,
                width: 88,
                height: 88,
                minHeight: 88,
                aspectRatio: 'auto',
              }}
              aria-label={`peça ${index + 1}`}
              onClick={() => void onTap(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
