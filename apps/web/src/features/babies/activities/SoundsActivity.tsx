import { useCallback, useState } from 'react';
import { babyPressHandlers } from '../../early-shared/babyPress';
import { playSoftBlip, resumeBabyAudio } from '../audio/softAudio';

const SOURCES = [
  { id: 0, color: '#c9b8a6', label: 'som suave 1' },
  { id: 1, color: '#a8c4b8', label: 'som suave 2' },
  { id: 2, color: '#b7c5d6', label: 'som suave 3' },
  { id: 3, color: '#d6c3b0', label: 'som suave 4' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function SoundsActivity({ onInteract }: Props) {
  const [pulseId, setPulseId] = useState<number | null>(null);

  const onTap = useCallback(
    (id: number) => {
      void resumeBabyAudio();
      playSoftBlip(id * 2);
      setPulseId(id);
      onInteract();
      window.setTimeout(() => setPulseId(null), 200);
    },
    [onInteract],
  );

  return (
    <div className="baby-grid" role="group" aria-label="Sons">
      {SOURCES.map((source) => (
        <button
          key={source.id}
          type="button"
          className={`baby-target baby-shape baby-shape--round${
            pulseId === source.id ? ' is-pulse' : ''
          }`}
          style={{ background: source.color }}
          aria-label={source.label}
          {...babyPressHandlers(() => onTap(source.id))}
        />
      ))}
    </div>
  );
}
