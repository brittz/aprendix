import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

const SHAPES = [
  { id: 'circle', color: '#6a5ae0', radius: '50%' },
  { id: 'square', color: '#22c55e', radius: '16px' },
  { id: 'pill', color: '#f59e0b', radius: '999px' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function SequencesActivity({ onInteract }: Props) {
  const sequence = useMemo(() => SHAPES, []);
  const [step, setStep] = useState(0);
  const [pulse, setPulse] = useState<string | null>(null);

  const onTap = useCallback(
    async (id: string) => {
      await resumeBabyAudio();
      const expected = sequence[step]!.id;
      setPulse(id);
      if (id === expected) {
        playSoftBlip(step + 2);
        const next = step + 1;
        if (next >= sequence.length) {
          playPop();
          onInteract();
          window.setTimeout(() => {
            setPulse(null);
            setStep(0);
          }, 360);
        } else {
          window.setTimeout(() => {
            setPulse(null);
            setStep(next);
          }, 220);
        }
      } else {
        playSoftBlip(1);
        window.setTimeout(() => {
          setPulse(null);
          setStep(0);
        }, 220);
      }
    },
    [onInteract, sequence, step],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="preschool-prompt">Toque na ordem</p>
      <div className="preschool-pair" style={{ marginBottom: '1rem' }} aria-hidden>
        {sequence.map((shape, i) => (
          <div
            key={shape.id}
            style={{
              width: 48,
              height: 48,
              borderRadius: shape.radius,
              background: shape.color,
              opacity: i === step ? 1 : 0.45,
              outline: i === step ? '3px solid var(--ax-accent)' : 'none',
            }}
          />
        ))}
      </div>
      <div className="preschool-choice-row" role="group" aria-label="Sequência">
        {[...sequence].reverse().map((shape) => (
          <button
            key={shape.id}
            type="button"
            className={`preschool-tile${pulse === shape.id ? ' is-pulse' : ''}`}
            style={{
              background: shape.color,
              borderRadius: shape.radius,
              width: 88,
              height: 88,
              minHeight: 88,
              aspectRatio: 'auto',
            }}
            aria-label={shape.id}
            onClick={() => void onTap(shape.id)}
          />
        ))}
      </div>
    </div>
  );
}
