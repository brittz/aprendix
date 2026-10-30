import { useCallback, useMemo, useState } from 'react';
import { babyPressHandlers } from '../../early-shared/babyPress';
import { resumeBabyAudio } from '../../babies/audio/softAudio';
import { speakWord, unlockSpeech } from '../../../utils/speak';
import '../pictureCards.css';

const COLORS = [
  { id: 'red', value: '#ef4444', label: 'vermelho' },
  { id: 'yellow', value: '#eab308', label: 'amarelo' },
  { id: 'green', value: '#22c55e', label: 'verde' },
  { id: 'blue', value: '#3b82f6', label: 'azul' },
  { id: 'purple', value: '#8b5cf6', label: 'roxo' },
  { id: 'orange', value: '#f97316', label: 'laranja' },
] as const;

interface Props {
  onInteract: () => void;
}

export default function ToddlerColorsActivity({ onInteract }: Props) {
  const [targetIndex, setTargetIndex] = useState(0);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'ok' | 'try' | null>(null);
  const target = COLORS[targetIndex]!;

  const options = useMemo(() => {
    const rest = COLORS.filter((c) => c.id !== target.id);
    const mix = [target, rest[0]!, rest[1]!, rest[2]!];
    return mix.sort(() => Math.random() - 0.5);
  }, [target]);

  const onTap = useCallback(
    (id: string, label: string) => {
      void resumeBabyAudio();
      void unlockSpeech();
      const correct = id === target.id;
      speakWord(label);
      setPulseId(id);
      if (correct) {
        setFeedback('ok');
        onInteract();
        window.setTimeout(() => {
          setPulseId(null);
          setFeedback(null);
          setTargetIndex((n) => (n + 1) % COLORS.length);
        }, 700);
      } else {
        setFeedback('try');
        window.setTimeout(() => {
          setPulseId(null);
          setFeedback(null);
        }, 420);
      }
    },
    [onInteract, target.id],
  );

  return (
    <div className="ax-picture-shell">
      <p className="toddler-prompt">Encontre: {target.label}</p>
      <button
        type="button"
        className="ax-color-sample"
        style={{ background: target.value }}
        aria-label={`Cor alvo: ${target.label}`}
        {...babyPressHandlers(() => {
          void unlockSpeech();
          speakWord(target.label);
        })}
      >
        <span className="ax-color-label">{target.label}</span>
      </button>
      {feedback === 'ok' && <p className="ax-picture-feedback is-ok">Isso! {target.label}</p>}
      {feedback === 'try' && <p className="ax-picture-feedback">Tente de novo</p>}
      <div className="ax-picture-grid ax-color-grid" role="group" aria-label="Cores">
        {options.map((color) => (
          <button
            key={`${target.id}-${color.id}`}
            type="button"
            className={`ax-picture-card ax-color-card${
              pulseId === color.id ? ' is-pulse' : ''
            }${pulseId === color.id && color.id === target.id ? ' is-correct' : ''}`}
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
