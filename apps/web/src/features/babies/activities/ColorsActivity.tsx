import { useCallback, useState } from 'react';
import { babyPressHandlers } from '../../early-shared/babyPress';
import { resumeBabyAudio } from '../audio/softAudio';
import { speakWord, unlockSpeech } from '../../../utils/speak';
import '../../toddlers/pictureCards.css';

const COLORS = [
  { id: 'red', value: '#e35d4d', label: 'vermelho' },
  { id: 'yellow', value: '#f0c84a', label: 'amarelo' },
  { id: 'green', value: '#4faf66', label: 'verde' },
  { id: 'blue', value: '#4a8fd4', label: 'azul' },
  { id: 'purple', value: '#8b6fc7', label: 'roxo' },
  { id: 'orange', value: '#f08a3a', label: 'laranja' },
  { id: 'pink', value: '#f078a8', label: 'rosa' },
  { id: 'brown', value: '#a67c52', label: 'marrom' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function ColorsActivity({ onInteract }: Props) {
  const [pulseId, setPulseId] = useState<string | null>(null);

  const onTap = useCallback(
    (id: string, label: string) => {
      void resumeBabyAudio();
      void unlockSpeech();
      speakWord(label);
      setPulseId(id);
      onInteract();
      window.setTimeout(() => setPulseId(null), 320);
    },
    [onInteract],
  );

  return (
    <div className="ax-picture-shell">
      <p className="toddler-prompt">Toque na cor e ouça o nome</p>
      <div className="ax-picture-grid ax-color-grid" role="group" aria-label="Cores">
        {COLORS.map((color) => (
          <button
            key={color.id}
            type="button"
            className={`ax-picture-card ax-color-card${
              pulseId === color.id ? ' is-pulse' : ''
            }`}
            style={{ background: color.value }}
            aria-label={color.label}
            {...babyPressHandlers(() => onTap(color.id, color.label))}
          >
            <span className="ax-picture-label ax-color-label">{color.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
