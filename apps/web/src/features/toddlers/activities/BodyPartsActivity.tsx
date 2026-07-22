import { useCallback, useState } from 'react';
import { playSoftBlip, resumeBabyAudio } from '../../babies/audio/softAudio';

const PARTS = [
  { id: 'head', label: 'cabeça', color: '#fda4af', size: 88 },
  { id: 'hand', label: 'mão', color: '#fdba74', size: 72 },
  { id: 'foot', label: 'pé', color: '#86efac', size: 72 },
  { id: 'eye', label: 'olho', color: '#93c5fd', size: 56 },
] as const;

interface Props {
  onInteract: () => void;
}

export default function BodyPartsActivity({ onInteract }: Props) {
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
    <div className="toddler-pair" role="group" aria-label="Partes do corpo">
      {PARTS.map((part, index) => (
        <button
          key={part.id}
          type="button"
          className={`toddler-target toddler-shape--circle${
            pulseId === part.id ? ' is-pulse' : ''
          }`}
          style={{
            background: part.color,
            width: part.size,
            height: part.size,
            minHeight: part.size,
            aspectRatio: 'auto',
          }}
          aria-label={part.label}
          onClick={() => void onTap(part.id, index + 1)}
        />
      ))}
    </div>
  );
}
