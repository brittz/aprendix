import { useCallback, useState } from 'react';
import { playSoftBlip, resumeBabyAudio } from '../../babies/audio/softAudio';

const FRUITS = [
  { id: 'apple', label: 'maçã', color: '#ef4444' },
  { id: 'banana', label: 'banana', color: '#eab308' },
  { id: 'grape', label: 'uva', color: '#8b5cf6' },
  { id: 'orange', label: 'laranja', color: '#f97316' },
  { id: 'lime', label: 'limão', color: '#84cc16' },
  { id: 'berry', label: 'morango', color: '#f43f5e' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function FruitsActivity({ onInteract }: Props) {
  const [pulseId, setPulseId] = useState<string | null>(null);

  const onTap = useCallback(
    async (id: string, seed: number) => {
      await resumeBabyAudio();
      playSoftBlip(seed + 2);
      setPulseId(id);
      onInteract();
      window.setTimeout(() => setPulseId(null), 220);
    },
    [onInteract],
  );

  return (
    <div className="toddler-grid" role="group" aria-label="Frutas">
      {FRUITS.map((fruit, index) => (
        <button
          key={fruit.id}
          type="button"
          className={`toddler-target toddler-shape--circle${
            pulseId === fruit.id ? ' is-pulse' : ''
          }`}
          style={{ background: fruit.color }}
          aria-label={fruit.label}
          onClick={() => void onTap(fruit.id, index)}
        />
      ))}
    </div>
  );
}
