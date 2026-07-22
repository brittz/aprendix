import { useCallback, useState } from 'react';
import { playAnimalCue, resumeBabyAudio } from '../../babies/audio/softAudio';

const ANIMALS = [
  { id: 'cat', label: 'gato', color: '#f0c987' },
  { id: 'dog', label: 'cão', color: '#c4a484' },
  { id: 'bird', label: 'pássaro', color: '#7eb6d4' },
  { id: 'cow', label: 'vaca', color: '#d5cfc4' },
  { id: 'frog', label: 'sapo', color: '#8fbc8a' },
  { id: 'duck', label: 'pato', color: '#e6c65c' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function ToddlerAnimalsActivity({ onInteract }: Props) {
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
    <div className="toddler-grid" role="group" aria-label="Animais">
      {ANIMALS.map((animal) => (
        <button
          key={animal.id}
          type="button"
          className={`toddler-target toddler-shape--soft${
            pulseId === animal.id ? ' is-pulse' : ''
          }`}
          style={{ background: animal.color, borderRadius: '28%' }}
          aria-label={animal.label}
          onClick={() => void onTap(animal.id)}
        />
      ))}
    </div>
  );
}
