import { useCallback, useState } from 'react';
import { playMelody, resumeBabyAudio } from '../audio/softAudio';

interface Props {
  onInteract: () => void;
}

export default function MusicActivity({ onInteract }: Props) {
  const [pulse, setPulse] = useState(false);

  const onTap = useCallback(async () => {
    await resumeBabyAudio();
    playMelody();
    setPulse(true);
    onInteract();
    window.setTimeout(() => setPulse(false), 1400);
  }, [onInteract]);

  return (
    <button
      type="button"
      className={`baby-color-field${pulse ? ' is-pulse' : ''}`}
      style={{
        background: 'linear-gradient(145deg, #d8ebe3 0%, #c5d9ef 100%)',
      }}
      aria-label="música"
      onClick={() => void onTap()}
    />
  );
}
