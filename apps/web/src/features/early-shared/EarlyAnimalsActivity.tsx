import { useCallback, useState } from 'react';
import { playAnimalCue, resumeBabyAudio } from '../babies/audio/softAudio';
import { AnimalFigure, EARLY_ANIMALS } from './AnimalFigure';
import './animalCards.css';

interface Props {
  onInteract: () => void;
}

/** Shared Animais activity used by every age band that offers it. */
export default function EarlyAnimalsActivity({ onInteract }: Props) {
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
    <div className="ax-animal-grid" role="group" aria-label="Animais">
      {EARLY_ANIMALS.map((animal) => (
        <button
          key={animal.id}
          type="button"
          className={`ax-animal-card${pulseId === animal.id ? ' is-pulse' : ''}`}
          style={{ background: animal.bg }}
          aria-label={animal.label}
          onClick={() => void onTap(animal.id)}
        >
          <span className="ax-animal-art">
            <AnimalFigure id={animal.id} />
          </span>
          <span className="ax-animal-label">{animal.label}</span>
        </button>
      ))}
    </div>
  );
}
