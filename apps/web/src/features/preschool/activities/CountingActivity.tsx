import { useCallback, useMemo, useState } from 'react';
import {
  playPop,
  playSoftBlip,
  resumeBabyAudio,
} from '../../babies/audio/softAudio';

interface Props {
  onInteract: () => void;
}

export default function CountingActivity({ onInteract }: Props) {
  const [target, setTarget] = useState(2);
  const [selected, setSelected] = useState<number[]>([]);
  const [pulse, setPulse] = useState<number | null>(null);

  const dots = useMemo(
    () => Array.from({ length: 5 }, (_, i) => i),
    [],
  );

  const nextTarget = useCallback(() => {
    setTarget((n) => (n >= 4 ? 1 : n + 1));
    setSelected([]);
    setPulse(null);
  }, []);

  const onTap = useCallback(
    async (index: number) => {
      await resumeBabyAudio();
      if (selected.includes(index)) return;

      const next = [...selected, index];
      setSelected(next);
      setPulse(index);
      playSoftBlip(next.length);

      if (next.length === target) {
        playPop();
        onInteract();
        window.setTimeout(nextTarget, 420);
      } else if (next.length > target) {
        playSoftBlip(1);
        window.setTimeout(() => {
          setSelected([]);
          setPulse(null);
        }, 220);
      } else {
        window.setTimeout(() => setPulse(null), 160);
      }
    },
    [nextTarget, onInteract, selected, target],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="preschool-prompt">Toque em {target}</p>
      <div className="preschool-choice-row" role="group" aria-label="Contagem">
        {dots.map((dot) => (
          <button
            key={dot}
            type="button"
            className={`preschool-tile${pulse === dot ? ' is-pulse' : ''}${
              selected.includes(dot) ? ' is-correct' : ''
            }`}
            style={{
              background: selected.includes(dot) ? '#6a5ae0' : '#c4b5fd',
              width: 64,
              height: 64,
              minHeight: 64,
              aspectRatio: 'auto',
              borderRadius: '50%',
            }}
            aria-label={`bolinha ${dot + 1}`}
            onClick={() => void onTap(dot)}
          />
        ))}
      </div>
    </div>
  );
}
