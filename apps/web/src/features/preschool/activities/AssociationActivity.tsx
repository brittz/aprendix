import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

const ITEMS = [
  { id: 'apple', label: 'maçã', color: '#ef4444', match: 'red' },
  { id: 'leaf', label: 'folha', color: '#22c55e', match: 'green' },
  { id: 'sky', label: 'céu', color: '#3b82f6', match: 'blue' },
  { id: 'sun', label: 'sol', color: '#eab308', match: 'yellow' },
] as const;

const COLORS = [
  { id: 'red', color: '#ef4444', label: 'vermelho' },
  { id: 'green', color: '#22c55e', label: 'verde' },
  { id: 'blue', color: '#3b82f6', label: 'azul' },
  { id: 'yellow', color: '#eab308', label: 'amarelo' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function AssociationActivity({ onInteract }: Props) {
  const [index, setIndex] = useState(0);
  const [pulse, setPulse] = useState<string | null>(null);
  const item = ITEMS[index % ITEMS.length]!;

  const options = useMemo(() => {
    const correct = COLORS.find((c) => c.id === item.match)!;
    const rest = COLORS.filter((c) => c.id !== item.match);
    return [correct, rest[0]!, rest[1]!].sort(() => Math.random() - 0.5);
  }, [item.match]);

  const onTap = useCallback(
    async (colorId: string) => {
      await resumeBabyAudio();
      const correct = colorId === item.match;
      setPulse(colorId);
      if (correct) {
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
    [item.match, onInteract],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="preschool-prompt">Qual cor combina?</p>
      <div className="preschool-pair" style={{ marginBottom: '1rem' }}>
        <div
          aria-label={item.label}
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: item.color,
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
            color: '#1f2430',
          }}
        >
          {item.label}
        </div>
      </div>
      <div className="preschool-choice-row" role="group" aria-label="Cores">
        {options.map((opt) => (
          <button
            key={`${item.id}-${opt.id}`}
            type="button"
            className={`preschool-tile${pulse === opt.id ? ' is-pulse' : ''}${
              pulse === opt.id && opt.id === item.match ? ' is-correct' : ''
            }`}
            style={{
              background: opt.color,
              width: 84,
              height: 84,
              minHeight: 84,
              aspectRatio: 'auto',
              borderRadius: '50%',
            }}
            aria-label={opt.label}
            onClick={() => void onTap(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
