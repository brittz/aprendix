import { useCallback, useState } from 'react';
import { babyPressHandlers } from '../../early-shared/babyPress';
import { resumeBabyAudio } from '../../babies/audio/softAudio';
import { speakWord, unlockSpeech } from '../../../utils/speak';
import '../pictureCards.css';

const FRUITS = [
  { id: 'apple', label: 'maçã', image: '/images/fruits/apple.webp' },
  { id: 'banana', label: 'banana', image: '/images/fruits/banana.jpg' },
  { id: 'grape', label: 'uva', image: '/images/fruits/grapes.webp' },
  { id: 'orange', label: 'laranja', image: '/images/fruits/orange.webp' },
  { id: 'lime', label: 'limão', image: '/images/fruits/lemon.webp' },
  { id: 'berry', label: 'morango', image: '/images/fruits/strawberry.webp' },
  { id: 'watermelon', label: 'melancia', image: '/images/fruits/watermelon.webp' },
  { id: 'pineapple', label: 'abacaxi', image: '/images/fruits/pineapple.webp' },
  { id: 'pear', label: 'pera', image: '/images/fruits/pear.webp' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function FruitsActivity({ onInteract }: Props) {
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [spokenId, setSpokenId] = useState<string | null>(null);

  const onTap = useCallback(
    (id: string, label: string) => {
      void resumeBabyAudio();
      void unlockSpeech();
      speakWord(label);
      setPulseId(id);
      setSpokenId(id);
      onInteract();
      window.setTimeout(() => setPulseId(null), 280);
    },
    [onInteract],
  );

  return (
    <div className="ax-picture-shell">
      <p className="toddler-prompt">Toque na fruta e ouça o nome</p>
      <div className="ax-picture-grid" role="group" aria-label="Frutas">
        {FRUITS.map((fruit) => (
          <button
            key={fruit.id}
            type="button"
            className={`ax-picture-card${pulseId === fruit.id ? ' is-pulse' : ''}${
              spokenId === fruit.id ? ' is-spoken' : ''
            }`}
            aria-label={fruit.label}
            {...babyPressHandlers(() => onTap(fruit.id, fruit.label))}
          >
            <span className="ax-picture-media">
              <img src={fruit.image} alt="" draggable={false} loading="lazy" />
            </span>
            <span className="ax-picture-label">{fruit.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
