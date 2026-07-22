import { useCallback, useEffect, useState } from 'react';
import { playBeat, resumeBabyAudio } from '../audio/softAudio';

interface Props {
  onInteract: () => void;
}

export default function RhythmActivity({ onInteract }: Props) {
  const [pulse, setPulse] = useState(false);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => {
      playBeat();
      setPulse(true);
      window.setTimeout(() => setPulse(false), 120);
    }, 700);
    return () => window.clearInterval(id);
  }, [auto]);

  const onTap = useCallback(async () => {
    await resumeBabyAudio();
    if (!auto) {
      setAuto(true);
      onInteract();
      return;
    }
    playBeat();
    setPulse(true);
    onInteract();
    window.setTimeout(() => setPulse(false), 120);
  }, [auto, onInteract]);

  return (
    <button
      type="button"
      className={`baby-color-field${pulse ? ' is-pulse' : ''}`}
      style={{
        background: pulse ? '#b7c9a8' : '#d5dfcb',
        borderRadius: '50%',
        width: 'min(70vw, 320px)',
        height: 'min(70vw, 320px)',
        minHeight: 'unset',
      }}
      aria-label="ritmo"
      onClick={() => void onTap()}
    />
  );
}
