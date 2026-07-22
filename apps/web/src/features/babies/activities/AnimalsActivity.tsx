import { useCallback, useState } from 'react';
import { playAnimalCue, resumeBabyAudio } from '../audio/softAudio';

const ANIMALS = [
  { id: 'cat', label: 'gato', color: '#e8b86d', shape: 'round' },
  { id: 'dog', label: 'cão', color: '#c4a484', shape: 'soft' },
  { id: 'bird', label: 'pássaro', color: '#7eb6d4', shape: 'oval' },
  { id: 'cow', label: 'vaca', color: '#d5cfc4', shape: 'block' },
  { id: 'frog', label: 'sapo', color: '#8fbc8a', shape: 'round' },
  { id: 'duck', label: 'pato', color: '#e6c65c', shape: 'oval' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function AnimalsActivity({ onInteract }: Props) {
  const [pulseId, setPulseId] = useState<string | null>(null);

  const onTap = useCallback(
    async (id: string) => {
      await resumeBabyAudio();
      playAnimalCue(id);
      setPulseId(id);
      onInteract();
      window.setTimeout(() => setPulseId(null), 220);
    },
    [onInteract],
  );

  return (
    <div className="baby-grid" role="group" aria-label="Animais">
      {ANIMALS.map((animal) => (
        <button
          key={animal.id}
          type="button"
          className={`baby-target baby-shape baby-shape--${animal.shape}${
            pulseId === animal.id ? ' is-pulse' : ''
          }`}
          style={{ background: animal.color }}
          aria-label={animal.label}
          onClick={() => void onTap(animal.id)}
        />
      ))}
    </div>
  );
}
