import { useCallback, useMemo, useState } from 'react';
import {
  playColorCue,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

const COLORS = [
  { id: 'red', value: '#ef4444', label: 'vermelho' },
  { id: 'yellow', value: '#eab308', label: 'amarelo' },
  { id: 'green', value: '#22c55e', label: 'verde' },
  { id: 'blue', value: '#3b82f6', label: 'azul' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function ToddlerColorsActivity({ onInteract }: Props) {
  const [targetIndex, setTargetIndex] = useState(0);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const target = COLORS[targetIndex]!;

  const options = useMemo(() => {
    const rest = COLORS.filter((c) => c.id !== target.id);
    const mix = [target, rest[0]!, rest[1]!, rest[2]!];
    return mix.sort(() => Math.random() - 0.5);
  }, [target]);

  const onTap = useCallback(
    async (id: string) => {
      await resumeBabyAudio();
      const correct = id === target.id;
      if (correct) {
        playColorCue(targetIndex);
        onInteract();
        setPulseId(id);
        window.setTimeout(() => {
          setPulseId(null);
          setTargetIndex((n) => (n + 1) % COLORS.length);
        }, 280);
      } else {
        playSoftBlip(1);
        setPulseId(id);
        window.setTimeout(() => setPulseId(null), 180);
      }
    },
    [onInteract, target.id, targetIndex],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="toddler-prompt">Encontre a cor</p>
      <div
        aria-hidden
        style={{
          width: 72,
          height: 72,
          borderRadius: 18,
          background: target.value,
          margin: '0 auto 1rem',
          boxShadow: 'var(--ax-shadow)',
        }}
      />
      <div className="toddler-grid" role="group" aria-label="Cores">
        {options.map((color) => (
          <button
            key={`${target.id}-${color.id}`}
            type="button"
            className={`toddler-target toddler-shape--circle${
              pulseId === color.id ? ' is-pulse' : ''
            }${pulseId === color.id && color.id === target.id ? ' is-correct' : ''}`}
            style={{ background: color.value }}
            aria-label={color.label}
            onClick={() => void onTap(color.id)}
          />
        ))}
      </div>
    </div>
  );
}
