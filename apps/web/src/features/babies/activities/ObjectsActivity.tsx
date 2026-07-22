import { useCallback, useState } from 'react';
import { playSoftBlip, resumeBabyAudio } from '../audio/softAudio';

const OBJECTS = [
  { id: 'ball', label: 'bola', color: '#d96b5c', shape: 'round' },
  { id: 'block', label: 'bloco', color: '#5b8fbf', shape: 'block' },
  { id: 'cup', label: 'copo', color: '#e6c65c', shape: 'soft' },
  { id: 'ring', label: 'anel', color: '#6faa7c', shape: 'oval' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function ObjectsActivity({ onInteract }: Props) {
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
    <div className="baby-grid" role="group" aria-label="Objetos">
      {OBJECTS.map((object, index) => (
        <button
          key={object.id}
          type="button"
          className={`baby-target baby-shape baby-shape--${object.shape}${
            pulseId === object.id ? ' is-pulse' : ''
          }`}
          style={{ background: object.color }}
          aria-label={object.label}
          onClick={() => void onTap(object.id, index + 3)}
        />
      ))}
    </div>
  );
}
