import { useCallback, useState } from 'react';
import { playSoftBlip, resumeBabyAudio } from '../../babies/audio/softAudio';

interface Props {
  onInteract: () => void;
}

export default function SizeActivity({ onInteract }: Props) {
  const [askBig, setAskBig] = useState(true);
  const [pulse, setPulse] = useState<'big' | 'small' | null>(null);

  const onTap = useCallback(
    async (which: 'big' | 'small') => {
      await resumeBabyAudio();
      const correct = (askBig && which === 'big') || (!askBig && which === 'small');
      playSoftBlip(correct ? 4 : 1);
      setPulse(which);
      if (correct) {
        onInteract();
        window.setTimeout(() => {
          setPulse(null);
          setAskBig((v) => !v);
        }, 280);
      } else {
        window.setTimeout(() => setPulse(null), 180);
      }
    },
    [askBig, onInteract],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="toddler-prompt">
        {askBig ? 'Toque no grande' : 'Toque no pequeno'}
      </p>
      <div className="toddler-pair">
        <button
          type="button"
          className={`toddler-target toddler-shape--circle${
            pulse === 'big' ? ' is-pulse' : ''
          }${pulse === 'big' && askBig ? ' is-correct' : ''}`}
          style={{
            background: '#6a5ae0',
            width: 140,
            height: 140,
            minHeight: 140,
            aspectRatio: 'auto',
          }}
          aria-label="grande"
          onClick={() => void onTap('big')}
        />
        <button
          type="button"
          className={`toddler-target toddler-shape--circle${
            pulse === 'small' ? ' is-pulse' : ''
          }${pulse === 'small' && !askBig ? ' is-correct' : ''}`}
          style={{
            background: '#38bdf8',
            width: 72,
            height: 72,
            minHeight: 72,
            aspectRatio: 'auto',
          }}
          aria-label="pequeno"
          onClick={() => void onTap('small')}
        />
      </div>
    </div>
  );
}
