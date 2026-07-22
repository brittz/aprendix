import { useCallback, useState } from 'react';
import {
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

const SHAPES = [
  { id: 'circle', label: 'círculo', color: '#6a5ae0', shape: 'circle' },
  { id: 'square', label: 'quadrado', color: '#22c55e', shape: 'square' },
  { id: 'triangle', label: 'triângulo', color: '#f59e0b', shape: 'triangle' },
  { id: 'oval', label: 'oval', color: '#38bdf8', shape: 'oval' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function ShapesActivity({ onInteract }: Props) {
  const [pulseId, setPulseId] = useState<string | null>(null);

  const onTap = useCallback(
    async (id: string, seed: number) => {
      await resumeBabyAudio();
      playSoftBlip(seed);
      setPulseId(id);
      onInteract();
      window.setTimeout(() => setPulseId(null), 220);
    },
    [onInteract],
  );

  return (
    <div className="toddler-grid" role="group" aria-label="Formas">
      {SHAPES.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={`toddler-target toddler-shape--${item.shape}${
            pulseId === item.id ? ' is-pulse' : ''
          }`}
          style={{ background: item.color }}
          aria-label={item.label}
          onClick={() => void onTap(item.id, index)}
        />
      ))}
    </div>
  );
}
