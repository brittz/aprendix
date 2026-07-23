import { useCallback, useState } from 'react';
import { playPop, playSoftBlip, resumeBabyAudio } from '../../babies/audio/softAudio';

const PAIRS = [
  { id: 'a', color: '#ef4444' },
  { id: 'b', color: '#22c55e' },
  { id: 'c', color: '#3b82f6' },
] as const;

interface Props {
  onInteract: () => void;
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

export default function MemoryActivity({ onInteract }: Props) {
  const [cards, setCards] = useState(() =>
    shuffle(
      PAIRS.flatMap((pair) => [
        { key: `${pair.id}-1`, pairId: pair.id, color: pair.color },
        { key: `${pair.id}-2`, pairId: pair.id, color: pair.color },
      ]),
    ),
  );
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const resetRound = useCallback(() => {
    setCards(
      shuffle(
        PAIRS.flatMap((pair) => [
          { key: `${pair.id}-1`, pairId: pair.id, color: pair.color },
          { key: `${pair.id}-2`, pairId: pair.id, color: pair.color },
        ]),
      ),
    );
    setOpen([]);
    setMatched([]);
    setBusy(false);
  }, []);

  const onTap = useCallback(
    async (key: string) => {
      if (busy || open.includes(key)) return;
      const card = cards.find((c) => c.key === key);
      if (!card || matched.includes(card.pairId)) return;

      await resumeBabyAudio();
      playSoftBlip(open.length);

      const nextOpen = [...open, key];
      setOpen(nextOpen);

      if (nextOpen.length < 2) return;

      setBusy(true);
      const [firstKey, secondKey] = nextOpen;
      const first = cards.find((c) => c.key === firstKey);
      const second = cards.find((c) => c.key === secondKey);
      const isMatch = Boolean(first && second && first.pairId === second.pairId);

      window.setTimeout(() => {
        if (isMatch && first) {
          playPop();
          const nextMatched = [...matched, first.pairId];
          setMatched(nextMatched);
          onInteract();
          if (nextMatched.length >= PAIRS.length) {
            window.setTimeout(resetRound, 500);
          }
        } else {
          playSoftBlip(1);
        }
        setOpen([]);
        setBusy(false);
      }, 480);
    },
    [busy, cards, matched, onInteract, open, resetRound],
  );

  return (
    <div style={{ width: '100%' }}>
      <p className="preschool-prompt">Encontre os pares</p>
      <div className="preschool-grid preschool-grid--3" role="group" aria-label="Memória">
        {cards.map((card) => {
          const faceUp =
            open.includes(card.key) || matched.includes(card.pairId);
          return (
            <button
              key={card.key}
              type="button"
              className={`preschool-tile${faceUp ? '' : ' is-face-down'}${
                matched.includes(card.pairId) ? ' is-matched' : ''
              }`}
              style={{ background: faceUp ? card.color : undefined }}
              aria-label={faceUp ? 'carta aberta' : 'carta fechada'}
              onClick={() => void onTap(card.key)}
            />
          );
        })}
      </div>
    </div>
  );
}
