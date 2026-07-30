/** Shared animal cards for every early-years “Animais” activity. */

import type { ReactElement } from 'react';

export type AnimalId =
  | 'cat'
  | 'dog'
  | 'bird'
  | 'cow'
  | 'frog'
  | 'duck'
  | 'pig'
  | 'horse'
  | 'sheep'
  | 'chicken';

export interface AnimalVisual {
  id: AnimalId;
  label: string;
  bg: string;
}

export const EARLY_ANIMALS: AnimalVisual[] = [
  { id: 'cat', label: 'Gato', bg: '#ffe8c8' },
  { id: 'dog', label: 'Cão', bg: '#f3e0c8' },
  { id: 'bird', label: 'Pássaro', bg: '#d7eef8' },
  { id: 'cow', label: 'Vaca', bg: '#eceae6' },
  { id: 'frog', label: 'Sapo', bg: '#dff0d8' },
  { id: 'duck', label: 'Pato', bg: '#fff3c4' },
  { id: 'pig', label: 'Porco', bg: '#f9d6e3' },
  { id: 'horse', label: 'Cavalo', bg: '#e8d5c4' },
  { id: 'sheep', label: 'Ovelha', bg: '#eef2f7' },
  { id: 'chicken', label: 'Galinha', bg: '#ffe6d2' },
];

interface FigureProps {
  id: AnimalId;
}

function CatFigure() {
  return (
    <>
      <ellipse cx="60" cy="78" rx="30" ry="22" fill="#f0b04a" />
      <circle cx="60" cy="48" r="28" fill="#f4b860" />
      <path d="M32 34 L40 6 L54 38 Z" fill="#e39b3a" />
      <path d="M88 34 L80 6 L66 38 Z" fill="#e39b3a" />
      <path d="M36 28 L42 14 L48 32" fill="#f7d29a" />
      <path d="M84 28 L78 14 L72 32" fill="#f7d29a" />
      <circle cx="48" cy="46" r="5" fill="#fff" />
      <circle cx="72" cy="46" r="5" fill="#fff" />
      <circle cx="49" cy="47" r="2.8" fill="#2b2b2b" />
      <circle cx="73" cy="47" r="2.8" fill="#2b2b2b" />
      <ellipse cx="60" cy="58" rx="6" ry="4" fill="#e8796a" />
      <path
        d="M30 56 H16 M30 64 H14 M90 56 H104 M90 64 H106"
        stroke="#2b2b2b"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M52 66 Q60 72 68 66"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  );
}

function DogFigure() {
  return (
    <>
      <ellipse cx="60" cy="80" rx="30" ry="22" fill="#b87a48" />
      <circle cx="60" cy="50" r="26" fill="#d4a574" />
      <ellipse
        cx="30"
        cy="62"
        rx="13"
        ry="22"
        fill="#8f5a32"
        transform="rotate(-22 30 62)"
      />
      <ellipse
        cx="90"
        cy="62"
        rx="13"
        ry="22"
        fill="#8f5a32"
        transform="rotate(22 90 62)"
      />
      <circle cx="49" cy="48" r="4.5" fill="#fff" />
      <circle cx="71" cy="48" r="4.5" fill="#fff" />
      <circle cx="50" cy="49" r="2.6" fill="#2b2b2b" />
      <circle cx="72" cy="49" r="2.6" fill="#2b2b2b" />
      <ellipse cx="60" cy="62" rx="10" ry="7" fill="#4a3222" />
      <circle cx="54" cy="60" r="1.8" fill="#f2d2b0" />
      <circle cx="66" cy="60" r="1.8" fill="#f2d2b0" />
      <path
        d="M52 70 Q60 78 68 70"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </>
  );
}

function BirdFigure() {
  return (
    <>
      <ellipse cx="52" cy="72" rx="32" ry="24" fill="#4aa2cc" />
      <circle cx="78" cy="44" r="22" fill="#6fbee0" />
      <path d="M96 44 L118 38 L100 58 Z" fill="#f0a040" />
      <circle cx="84" cy="40" r="4.5" fill="#fff" />
      <circle cx="85" cy="41" r="2.5" fill="#2b2b2b" />
      <ellipse
        cx="38"
        cy="68"
        rx="18"
        ry="11"
        fill="#3a8bb4"
        transform="rotate(-24 38 68)"
      />
      <path
        d="M44 94 L40 112 M62 94 L68 112"
        stroke="#f0a040"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </>
  );
}

function CowFigure() {
  return (
    <>
      <ellipse cx="60" cy="80" rx="34" ry="24" fill="#f7f4ec" />
      <circle cx="60" cy="48" r="26" fill="#f7f4ec" />
      <ellipse cx="38" cy="70" rx="12" ry="10" fill="#2f2f2f" />
      <ellipse cx="82" cy="84" rx="14" ry="10" fill="#2f2f2f" />
      <ellipse cx="72" cy="38" rx="9" ry="7" fill="#2f2f2f" />
      <path d="M38 26 L32 8 L50 30" fill="#ebe3d4" stroke="#c9bda8" strokeWidth="2" />
      <path d="M82 26 L88 8 L70 30" fill="#ebe3d4" stroke="#c9bda8" strokeWidth="2" />
      <circle cx="49" cy="46" r="4" fill="#fff" />
      <circle cx="71" cy="46" r="4" fill="#fff" />
      <circle cx="50" cy="47" r="2.3" fill="#2b2b2b" />
      <circle cx="72" cy="47" r="2.3" fill="#2b2b2b" />
      <ellipse cx="60" cy="60" rx="12" ry="8" fill="#f2b8c0" />
      <circle cx="54" cy="58" r="1.6" fill="#d98a94" />
      <circle cx="66" cy="58" r="1.6" fill="#d98a94" />
    </>
  );
}

function FrogFigure() {
  return (
    <>
      <ellipse cx="60" cy="76" rx="36" ry="28" fill="#5fb453" />
      <circle cx="38" cy="40" r="18" fill="#78c86c" />
      <circle cx="82" cy="40" r="18" fill="#78c86c" />
      <circle cx="38" cy="40" r="8" fill="#fff" />
      <circle cx="82" cy="40" r="8" fill="#fff" />
      <circle cx="38" cy="40" r="4" fill="#2b2b2b" />
      <circle cx="82" cy="40" r="4" fill="#2b2b2b" />
      <path
        d="M44 82 Q60 96 76 82"
        fill="none"
        stroke="#2f6f2a"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="90" rx="14" ry="9" fill="#4f9f45" />
      <ellipse cx="98" cy="90" rx="14" ry="9" fill="#4f9f45" />
    </>
  );
}

function DuckFigure() {
  return (
    <>
      <ellipse cx="52" cy="78" rx="34" ry="24" fill="#efc83a" />
      <circle cx="82" cy="46" r="22" fill="#f6db66" />
      <path d="M100 48 L122 42 L104 62 Z" fill="#f08a2a" />
      <circle cx="88" cy="42" r="4.5" fill="#fff" />
      <circle cx="89" cy="43" r="2.5" fill="#2b2b2b" />
      <ellipse
        cx="34"
        cy="72"
        rx="16"
        ry="10"
        fill="#dfb82f"
        transform="rotate(-28 34 72)"
      />
      <path
        d="M46 100 L42 114 M64 100 L70 114"
        stroke="#f08a2a"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </>
  );
}

function PigFigure() {
  return (
    <>
      <ellipse cx="60" cy="72" rx="36" ry="28" fill="#f2a0b8" />
      <circle cx="60" cy="48" r="26" fill="#f5b0c4" />
      <ellipse cx="60" cy="58" rx="12" ry="9" fill="#e87898" />
      <ellipse cx="55" cy="58" rx="2.2" ry="3" fill="#2b2b2b" />
      <ellipse cx="65" cy="58" rx="2.2" ry="3" fill="#2b2b2b" />
      <circle cx="48" cy="44" r="4" fill="#fff" />
      <circle cx="72" cy="44" r="4" fill="#fff" />
      <circle cx="49" cy="45" r="2.2" fill="#2b2b2b" />
      <circle cx="73" cy="45" r="2.2" fill="#2b2b2b" />
      <ellipse cx="28" cy="42" rx="8" ry="10" fill="#ef8fad" />
      <ellipse cx="92" cy="42" rx="8" ry="10" fill="#ef8fad" />
      <path
        d="M88 88 Q104 78 102 98"
        fill="none"
        stroke="#d86a8c"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function HorseFigure() {
  return (
    <>
      <ellipse cx="58" cy="78" rx="34" ry="24" fill="#b07a4a" />
      <ellipse cx="86" cy="48" rx="18" ry="22" fill="#c48956" />
      <ellipse cx="98" cy="34" rx="14" ry="10" fill="#c48956" />
      <path d="M108 34 L122 30 L112 44 Z" fill="#8a5a34" />
      <circle cx="102" cy="30" r="3.5" fill="#2b2b2b" />
      <path
        d="M72 28 Q78 8 90 22"
        fill="none"
        stroke="#6e4428"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M40 98 L36 114 M54 100 L54 116 M70 100 L74 116 M86 96 L92 112"
        stroke="#8a5a34"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function SheepFigure() {
  return (
    <>
      <ellipse cx="60" cy="74" rx="38" ry="28" fill="#f4f6f8" />
      <circle cx="34" cy="58" r="10" fill="#eceff3" />
      <circle cx="52" cy="50" r="12" fill="#eceff3" />
      <circle cx="72" cy="50" r="12" fill="#eceff3" />
      <circle cx="90" cy="60" r="10" fill="#eceff3" />
      <circle cx="88" cy="42" r="18" fill="#2f2f2f" />
      <circle cx="94" cy="38" r="3.5" fill="#fff" />
      <circle cx="95" cy="39" r="2" fill="#2b2b2b" />
      <ellipse cx="104" cy="46" rx="7" ry="4" fill="#f0a0a8" />
      <path
        d="M42 100 L38 114 M58 102 L58 116 M74 102 L78 116"
        stroke="#2f2f2f"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </>
  );
}

function ChickenFigure() {
  return (
    <>
      <ellipse cx="58" cy="72" rx="30" ry="24" fill="#f2f0ec" />
      <circle cx="84" cy="48" r="20" fill="#f7f5f1" />
      <path d="M78 28 L84 12 L90 28 Z" fill="#e24a3a" />
      <path d="M70 30 L76 16 L82 30 Z" fill="#c93a2c" />
      <path d="M86 30 L92 16 L98 30 Z" fill="#c93a2c" />
      <path d="M100 50 L118 48 L104 62 Z" fill="#f08a2a" />
      <circle cx="90" cy="44" r="4" fill="#fff" />
      <circle cx="91" cy="45" r="2.2" fill="#2b2b2b" />
      <ellipse
        cx="42"
        cy="68"
        rx="14"
        ry="9"
        fill="#e8a02a"
        transform="rotate(-20 42 68)"
      />
      <path
        d="M50 94 L46 110 M68 94 L72 110"
        stroke="#f08a2a"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

const FIGURES: Record<AnimalId, () => ReactElement> = {
  cat: CatFigure,
  dog: DogFigure,
  bird: BirdFigure,
  cow: CowFigure,
  frog: FrogFigure,
  duck: DuckFigure,
  pig: PigFigure,
  horse: HorseFigure,
  sheep: SheepFigure,
  chicken: ChickenFigure,
};

export function AnimalFigure({ id }: FigureProps) {
  const Figure = FIGURES[id];
  return (
    <svg
      className="ax-animal-figure"
      viewBox="0 0 120 120"
      width="100%"
      height="100%"
      aria-hidden
      focusable="false"
    >
      <Figure />
    </svg>
  );
}
