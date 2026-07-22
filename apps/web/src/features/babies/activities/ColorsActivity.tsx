import { useCallback, useState } from 'react';
import { playColorCue, resumeBabyAudio } from '../audio/softAudio';

const COLORS = [
  { id: 'red', value: '#d96b5c', label: 'vermelho' },
  { id: 'yellow', value: '#e6c65c', label: 'amarelo' },
  { id: 'green', value: '#6faa7c', label: 'verde' },
  { id: 'blue', value: '#5b8fbf', label: 'azul' },
  { id: 'purple', value: '#8f7bb8', label: 'roxo' },
  { id: 'orange', value: '#e09555', label: 'laranja' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function ColorsActivity({ onInteract }: Props) {
  const [index, setIndex] = useState(0);
  const [pulse, setPulse] = useState(false);
  const current = COLORS[index]!;

  const onTap = useCallback(async () => {
    await resumeBabyAudio();
    playColorCue(index);
    setPulse(true);
    onInteract();
    window.setTimeout(() => {
      setPulse(false);
      setIndex((prev) => (prev + 1) % COLORS.length);
    }, 280);
  }, [index, onInteract]);

  return (
    <button
      type="button"
      className={`baby-color-field${pulse ? ' is-pulse' : ''}`}
      style={{ background: current.value }}
      aria-label={current.label}
      onClick={() => void onTap()}
    />
  );
}
