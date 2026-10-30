/** Cute SVG figure fragments for every early-years AnimalId. */

import type { ReactElement } from 'react';
import type { AnimalId } from './animalCatalog';

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

function RoosterFigure() {
  return (
    <>
      <ellipse cx="56" cy="74" rx="28" ry="22" fill="#e87840" />
      <circle cx="82" cy="48" r="20" fill="#f08a4a" />
      <path d="M74 28 L82 8 L90 28 Z" fill="#e24a3a" />
      <path d="M66 30 L74 12 L80 32 Z" fill="#c93a2c" />
      <path d="M86 30 L94 10 L98 32 Z" fill="#c93a2c" />
      <path d="M98 50 L118 44 L104 64 Z" fill="#f0c040" />
      <circle cx="88" cy="44" r="4" fill="#fff" />
      <circle cx="89" cy="45" r="2.2" fill="#2b2b2b" />
      <ellipse
        cx="40"
        cy="68"
        rx="16"
        ry="10"
        fill="#2a6f4a"
        transform="rotate(-18 40 68)"
      />
      <path
        d="M48 94 L44 112 M66 94 L72 112"
        stroke="#f08a2a"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="56" cy="88" rx="8" ry="5" fill="#f0c040" />
    </>
  );
}

function GoatFigure() {
  return (
    <>
      <ellipse cx="58" cy="78" rx="32" ry="22" fill="#d8c4a4" />
      <circle cx="86" cy="50" r="18" fill="#e2d0b4" />
      <path d="M78 34 L72 14 L84 30 Z" fill="#cbb28e" />
      <path d="M90 34 L98 12 L96 34 Z" fill="#cbb28e" />
      <circle cx="92" cy="46" r="3.5" fill="#2b2b2b" />
      <ellipse cx="104" cy="54" rx="8" ry="4" fill="#f0a0a8" />
      <path
        d="M42 98 L38 114 M58 100 L58 116 M74 98 L78 114"
        stroke="#a88b64"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function DonkeyFigure() {
  return (
    <>
      <ellipse cx="56" cy="78" rx="32" ry="22" fill="#9a9084" />
      <ellipse cx="84" cy="50" rx="16" ry="20" fill="#aea498" />
      <ellipse cx="96" cy="36" rx="12" ry="9" fill="#aea498" />
      <path d="M74 32 L66 8 L80 34 Z" fill="#7a7064" />
      <path d="M90 30 L98 6 L96 34 Z" fill="#7a7064" />
      <path d="M74 28 L68 14 L78 30" fill="#c8b8a8" />
      <path d="M92 28 L96 12 L98 30" fill="#c8b8a8" />
      <circle cx="100" cy="32" r="3.2" fill="#2b2b2b" />
      <ellipse cx="108" cy="40" rx="7" ry="4" fill="#d8a090" />
      <path
        d="M38 98 L34 114 M54 100 L54 116 M70 100 L74 116 M84 96 L90 112"
        stroke="#6e665c"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function TurkeyFigure() {
  return (
    <>
      <ellipse cx="52" cy="76" rx="30" ry="24" fill="#8a5a3a" />
      <circle cx="80" cy="50" r="18" fill="#a06a48" />
      <ellipse
        cx="36"
        cy="64"
        rx="18"
        ry="22"
        fill="#c07040"
        transform="rotate(-20 36 64)"
      />
      <ellipse
        cx="28"
        cy="70"
        rx="12"
        ry="16"
        fill="#e09050"
        transform="rotate(-10 28 70)"
      />
      <path d="M94 52 L112 48 L98 64 Z" fill="#e87840" />
      <circle cx="86" cy="46" r="3.5" fill="#fff" />
      <circle cx="87" cy="47" r="2" fill="#2b2b2b" />
      <path d="M78 66 Q86 78 80 86" fill="none" stroke="#c04050" strokeWidth="5" strokeLinecap="round" />
      <path
        d="M46 98 L42 114 M64 98 L68 114"
        stroke="#e87840"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function LionFigure() {
  return (
    <>
      <circle cx="60" cy="58" r="34" fill="#e2a04a" />
      <circle cx="60" cy="58" r="24" fill="#f0c06a" />
      <circle cx="50" cy="54" r="4.5" fill="#fff" />
      <circle cx="70" cy="54" r="4.5" fill="#fff" />
      <circle cx="51" cy="55" r="2.4" fill="#2b2b2b" />
      <circle cx="71" cy="55" r="2.4" fill="#2b2b2b" />
      <ellipse cx="60" cy="66" rx="7" ry="5" fill="#d8893a" />
      <path
        d="M52 74 Q60 80 68 74"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse cx="36" cy="88" rx="10" ry="7" fill="#e2a04a" />
      <ellipse cx="84" cy="88" rx="10" ry="7" fill="#e2a04a" />
    </>
  );
}

function ElephantFigure() {
  return (
    <>
      <ellipse cx="58" cy="70" rx="34" ry="26" fill="#9aa3b0" />
      <circle cx="40" cy="52" r="22" fill="#aeb6c2" />
      <ellipse cx="22" cy="52" rx="10" ry="14" fill="#9aa3b0" />
      <path
        d="M34 66 Q28 96 42 104"
        fill="none"
        stroke="#8b95a3"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <circle cx="34" cy="46" r="3.5" fill="#2b2b2b" />
      <path d="M28 58 L18 70" stroke="#eceff3" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M32 60 L22 74" stroke="#eceff3" strokeWidth="3.5" strokeLinecap="round" />
      <path
        d="M48 94 L44 112 M68 96 L70 114 M84 92 L90 110"
        stroke="#7f8896"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function MonkeyFigure() {
  return (
    <>
      <ellipse cx="60" cy="78" rx="28" ry="22" fill="#b07a4a" />
      <circle cx="60" cy="48" r="26" fill="#c48956" />
      <ellipse cx="60" cy="56" rx="16" ry="14" fill="#f0d2a8" />
      <circle cx="50" cy="48" r="4" fill="#fff" />
      <circle cx="70" cy="48" r="4" fill="#fff" />
      <circle cx="51" cy="49" r="2.2" fill="#2b2b2b" />
      <circle cx="71" cy="49" r="2.2" fill="#2b2b2b" />
      <ellipse cx="60" cy="60" rx="5" ry="3.5" fill="#d89a6a" />
      <ellipse cx="34" cy="42" rx="8" ry="10" fill="#b07a4a" />
      <ellipse cx="86" cy="42" rx="8" ry="10" fill="#b07a4a" />
      <path
        d="M86 86 Q104 78 100 102"
        fill="none"
        stroke="#8a5a34"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </>
  );
}

function HyenaFigure() {
  return (
    <>
      <ellipse cx="58" cy="78" rx="34" ry="22" fill="#c8a878" />
      <ellipse cx="86" cy="52" rx="16" ry="18" fill="#d4b888" />
      <ellipse cx="98" cy="40" rx="12" ry="9" fill="#d4b888" />
      <circle cx="102" cy="36" r="3" fill="#2b2b2b" />
      <ellipse cx="40" cy="68" rx="8" ry="6" fill="#a88858" />
      <ellipse cx="70" cy="72" rx="7" ry="5" fill="#a88858" />
      <ellipse cx="55" cy="86" rx="6" ry="4" fill="#a88858" />
      <path
        d="M70 34 Q78 18 88 30"
        fill="none"
        stroke="#8a7048"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M40 98 L36 114 M56 100 L56 116 M72 100 L76 114 M88 96 L94 112"
        stroke="#8a7048"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function CamelFigure() {
  return (
    <>
      <ellipse cx="54" cy="78" rx="32" ry="20" fill="#d4a86a" />
      <ellipse cx="48" cy="54" rx="16" ry="14" fill="#e0b878" />
      <ellipse cx="70" cy="52" rx="14" ry="12" fill="#e0b878" />
      <ellipse cx="92" cy="48" rx="12" ry="16" fill="#d4a86a" />
      <ellipse cx="102" cy="34" rx="10" ry="8" fill="#d4a86a" />
      <circle cx="106" cy="30" r="2.8" fill="#2b2b2b" />
      <path d="M110 34 L120 30 L114 42 Z" fill="#b88848" />
      <path
        d="M38 96 L34 114 M56 98 L56 116 M72 98 L76 114 M86 94 L92 110"
        stroke="#b88848"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function GiraffeFigure() {
  return (
    <>
      <ellipse cx="48" cy="92" rx="26" ry="16" fill="#e8b050" />
      <rect x="58" y="28" width="14" height="58" rx="7" fill="#f0c060" />
      <ellipse cx="72" cy="24" rx="14" ry="12" fill="#f0c060" />
      <circle cx="78" cy="20" r="3" fill="#2b2b2b" />
      <path d="M84 24 L98 22 L88 32 Z" fill="#c88840" />
      <rect x="62" y="8" width="4" height="12" rx="2" fill="#c88840" />
      <rect x="70" y="8" width="4" height="12" rx="2" fill="#c88840" />
      <circle cx="42" cy="86" r="5" fill="#c88840" />
      <circle cx="58" cy="94" r="4" fill="#c88840" />
      <circle cx="64" cy="50" r="4" fill="#c88840" />
      <circle cx="66" cy="68" r="3.5" fill="#c88840" />
      <path
        d="M34 104 L30 116 M48 106 L48 118 M62 104 L66 116"
        stroke="#c88840"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </>
  );
}

function ZebraFigure() {
  return (
    <>
      <ellipse cx="56" cy="78" rx="32" ry="22" fill="#f4f4f6" />
      <ellipse cx="84" cy="50" rx="16" ry="20" fill="#f4f4f6" />
      <ellipse cx="96" cy="36" rx="12" ry="9" fill="#f4f4f6" />
      <circle cx="100" cy="32" r="3" fill="#2b2b2b" />
      <path d="M42 68 L42 90 M54 64 L54 92 M66 68 L66 88" stroke="#2b2b2b" strokeWidth="4" strokeLinecap="round" />
      <path d="M80 42 L80 62 M88 38 L88 58" stroke="#2b2b2b" strokeWidth="3.5" strokeLinecap="round" />
      <path
        d="M70 30 Q78 12 88 26"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M38 98 L34 114 M54 100 L54 116 M70 100 L74 116 M86 96 L92 112"
        stroke="#2b2b2b"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function HippoFigure() {
  return (
    <>
      <ellipse cx="60" cy="72" rx="40" ry="28" fill="#b8a0b0" />
      <ellipse cx="60" cy="52" rx="28" ry="22" fill="#c8b0c0" />
      <ellipse cx="60" cy="64" rx="18" ry="12" fill="#a88898" />
      <circle cx="48" cy="48" r="4" fill="#2b2b2b" />
      <circle cx="72" cy="48" r="4" fill="#2b2b2b" />
      <ellipse cx="52" cy="62" rx="2.5" ry="3.5" fill="#2b2b2b" />
      <ellipse cx="68" cy="62" rx="2.5" ry="3.5" fill="#2b2b2b" />
      <ellipse cx="28" cy="58" rx="8" ry="10" fill="#b8a0b0" />
      <ellipse cx="92" cy="58" rx="8" ry="10" fill="#b8a0b0" />
      <path
        d="M40 96 L36 112 M56 98 L56 114 M76 96 L80 112"
        stroke="#988090"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function FlamingoFigure() {
  return (
    <>
      <ellipse cx="48" cy="58" rx="22" ry="16" fill="#f8a0c0" />
      <path
        d="M66 52 Q88 28 96 48 Q88 62 72 58"
        fill="#ffb0d0"
      />
      <circle cx="98" cy="44" r="10" fill="#ffb8d4" />
      <path d="M106 44 L118 40 L110 52 Z" fill="#e87090" />
      <circle cx="102" cy="40" r="2.5" fill="#2b2b2b" />
      <path
        d="M48 72 L44 108 M56 72 L60 108"
        stroke="#e87090"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <ellipse cx="42" cy="110" rx="8" ry="3" fill="#e87090" />
      <ellipse cx="64" cy="110" rx="8" ry="3" fill="#e87090" />
    </>
  );
}

function HornbillFigure() {
  return (
    <>
      <ellipse cx="48" cy="72" rx="28" ry="22" fill="#3a3a48" />
      <circle cx="74" cy="48" r="18" fill="#4a4a58" />
      <ellipse cx="42" cy="66" rx="14" ry="10" fill="#e8a030" transform="rotate(-20 42 66)" />
      <path d="M88 44 L118 36 L112 52 L96 56 Z" fill="#f0c040" />
      <ellipse cx="96" cy="38" rx="10" ry="6" fill="#e89030" />
      <circle cx="80" cy="44" r="3.5" fill="#fff" />
      <circle cx="81" cy="45" r="2" fill="#2b2b2b" />
      <path
        d="M40 92 L36 110 M56 92 L60 110"
        stroke="#f0c040"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function GibbonFigure() {
  return (
    <>
      <ellipse cx="60" cy="78" rx="24" ry="20" fill="#6a5040" />
      <circle cx="60" cy="48" r="22" fill="#7a6050" />
      <ellipse cx="60" cy="54" rx="14" ry="12" fill="#e8d0b0" />
      <circle cx="52" cy="46" r="3.5" fill="#fff" />
      <circle cx="68" cy="46" r="3.5" fill="#fff" />
      <circle cx="53" cy="47" r="2" fill="#2b2b2b" />
      <circle cx="69" cy="47" r="2" fill="#2b2b2b" />
      <ellipse cx="60" cy="58" rx="4" ry="3" fill="#c8a080" />
      <path
        d="M36 70 Q18 50 22 90"
        fill="none"
        stroke="#6a5040"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M84 70 Q102 50 98 90"
        fill="none"
        stroke="#6a5040"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </>
  );
}

function EagleFigure() {
  return (
    <>
      <ellipse cx="60" cy="70" rx="28" ry="22" fill="#8a6a48" />
      <circle cx="60" cy="42" r="18" fill="#f0e0c0" />
      <ellipse
        cx="28"
        cy="68"
        rx="20"
        ry="10"
        fill="#6a5040"
        transform="rotate(-30 28 68)"
      />
      <ellipse
        cx="92"
        cy="68"
        rx="20"
        ry="10"
        fill="#6a5040"
        transform="rotate(30 92 68)"
      />
      <path d="M60 52 L52 62 L68 62 Z" fill="#f0a040" />
      <circle cx="52" cy="40" r="3.5" fill="#2b2b2b" />
      <circle cx="68" cy="40" r="3.5" fill="#2b2b2b" />
      <path
        d="M50 90 L46 110 M70 90 L74 110"
        stroke="#f0a040"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function MacawFigure() {
  return (
    <>
      <ellipse cx="50" cy="72" rx="28" ry="24" fill="#2a6fd4" />
      <circle cx="78" cy="46" r="20" fill="#3a8af0" />
      <ellipse
        cx="36"
        cy="66"
        rx="16"
        ry="12"
        fill="#f0c040"
        transform="rotate(-24 36 66)"
      />
      <path d="M94 48 L116 40 L100 64 Z" fill="#e85030" />
      <circle cx="84" cy="42" r="4" fill="#fff" />
      <circle cx="85" cy="43" r="2.2" fill="#2b2b2b" />
      <ellipse cx="70" cy="58" rx="8" ry="5" fill="#e85030" />
      <path
        d="M42 94 L38 112 M60 94 L66 112"
        stroke="#f0c040"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function ParrotFigure() {
  return (
    <>
      <ellipse cx="50" cy="72" rx="28" ry="24" fill="#3cb060" />
      <circle cx="78" cy="46" r="20" fill="#4cc870" />
      <ellipse
        cx="36"
        cy="66"
        rx="16"
        ry="11"
        fill="#2a9050"
        transform="rotate(-24 36 66)"
      />
      <path d="M94 48 L116 42 L100 62 Z" fill="#e85040" />
      <circle cx="84" cy="42" r="4" fill="#fff" />
      <circle cx="85" cy="43" r="2.2" fill="#2b2b2b" />
      <ellipse cx="68" cy="58" rx="7" ry="5" fill="#e8d040" />
      <path
        d="M42 94 L38 112 M60 94 L66 112"
        stroke="#e85040"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function ParakeetFigure() {
  return (
    <>
      <ellipse cx="52" cy="70" rx="24" ry="20" fill="#70d040" />
      <circle cx="76" cy="46" r="16" fill="#88e050" />
      <ellipse
        cx="40"
        cy="64"
        rx="12"
        ry="8"
        fill="#50b030"
        transform="rotate(-20 40 64)"
      />
      <path d="M90 48 L108 44 L94 58 Z" fill="#f0a040" />
      <circle cx="82" cy="42" r="3.5" fill="#fff" />
      <circle cx="83" cy="43" r="2" fill="#2b2b2b" />
      <circle cx="70" cy="52" r="4" fill="#e85070" />
      <path
        d="M44 88 L40 106 M60 88 L64 106"
        stroke="#f0a040"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </>
  );
}

function HowlerFigure() {
  return (
    <>
      <ellipse cx="60" cy="80" rx="28" ry="22" fill="#8a6040" />
      <circle cx="60" cy="48" r="26" fill="#9a7050" />
      <ellipse cx="60" cy="58" rx="14" ry="12" fill="#d8b090" />
      <ellipse cx="60" cy="68" rx="12" ry="8" fill="#6a4830" />
      <circle cx="50" cy="46" r="4" fill="#fff" />
      <circle cx="70" cy="46" r="4" fill="#fff" />
      <circle cx="51" cy="47" r="2.2" fill="#2b2b2b" />
      <circle cx="71" cy="47" r="2.2" fill="#2b2b2b" />
      <ellipse cx="34" cy="40" rx="8" ry="11" fill="#8a6040" />
      <ellipse cx="86" cy="40" rx="8" ry="11" fill="#8a6040" />
      <path
        d="M86 86 Q104 76 100 100"
        fill="none"
        stroke="#6a4830"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </>
  );
}

function JaguarFigure() {
  return (
    <>
      <ellipse cx="60" cy="78" rx="32" ry="22" fill="#f0a830" />
      <circle cx="60" cy="48" r="26" fill="#f8b840" />
      <circle cx="48" cy="44" r="4.5" fill="#fff" />
      <circle cx="72" cy="44" r="4.5" fill="#fff" />
      <circle cx="49" cy="45" r="2.5" fill="#2b2b2b" />
      <circle cx="73" cy="45" r="2.5" fill="#2b2b2b" />
      <ellipse cx="60" cy="58" rx="7" ry="5" fill="#d88820" />
      <circle cx="42" cy="70" r="4" fill="#2b2b2b" />
      <circle cx="58" cy="82" r="3.5" fill="#2b2b2b" />
      <circle cx="76" cy="72" r="4" fill="#2b2b2b" />
      <circle cx="50" cy="58" r="3" fill="#2b2b2b" />
      <circle cx="70" cy="62" r="3" fill="#2b2b2b" />
      <path d="M36 30 L42 10 L50 34 Z" fill="#e89828" />
      <path d="M84 30 L78 10 L70 34 Z" fill="#e89828" />
      <path
        d="M52 68 Q60 74 68 68"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
}

function HorneroFigure() {
  return (
    <>
      <ellipse cx="52" cy="72" rx="26" ry="20" fill="#c88850" />
      <circle cx="78" cy="48" r="16" fill="#d89860" />
      <ellipse
        cx="38"
        cy="66"
        rx="12"
        ry="8"
        fill="#b07840"
        transform="rotate(-20 38 66)"
      />
      <path d="M92 50 L108 48 L96 60 Z" fill="#a06838" />
      <circle cx="84" cy="44" r="3.5" fill="#fff" />
      <circle cx="85" cy="45" r="2" fill="#2b2b2b" />
      <circle cx="40" cy="50" r="12" fill="#d4a070" />
      <path
        d="M44 90 L40 108 M62 90 L66 108"
        stroke="#a06838"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </>
  );
}

function PotooFigure() {
  return (
    <>
      <ellipse cx="60" cy="72" rx="26" ry="28" fill="#c8b898" />
      <circle cx="60" cy="42" r="20" fill="#d4c4a4" />
      <circle cx="48" cy="40" r="8" fill="#fff" />
      <circle cx="72" cy="40" r="8" fill="#fff" />
      <circle cx="48" cy="40" r="4" fill="#2b2b2b" />
      <circle cx="72" cy="40" r="4" fill="#2b2b2b" />
      <ellipse cx="60" cy="54" rx="6" ry="3" fill="#a09070" />
      <path d="M50 28 L46 14 L56 26 Z" fill="#b0a080" />
      <path d="M70 28 L74 14 L64 26 Z" fill="#b0a080" />
      <path
        d="M48 96 L44 112 M72 96 L76 112"
        stroke="#a09070"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function HoatzinFigure() {
  return (
    <>
      <ellipse cx="52" cy="74" rx="28" ry="22" fill="#6a8050" />
      <circle cx="78" cy="48" r="18" fill="#788860" />
      <path d="M70 30 L78 8 L86 32 L74 34 Z" fill="#c07040" />
      <ellipse
        cx="36"
        cy="68"
        rx="14"
        ry="10"
        fill="#e8d060"
        transform="rotate(-22 36 68)"
      />
      <path d="M94 50 L110 46 L98 62 Z" fill="#c07040" />
      <circle cx="84" cy="44" r="3.5" fill="#fff" />
      <circle cx="85" cy="45" r="2" fill="#2b2b2b" />
      <path
        d="M42 94 L38 112 M62 94 L66 112"
        stroke="#c07040"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function GeckoFigure() {
  return (
    <>
      <ellipse cx="60" cy="60" rx="36" ry="18" fill="#70c050" />
      <circle cx="92" cy="52" r="14" fill="#88d068" />
      <circle cx="98" cy="48" r="3" fill="#2b2b2b" />
      <circle cx="100" cy="46" r="3" fill="#2b2b2b" />
      <path
        d="M28 60 Q12 48 18 70 Q12 78 28 68"
        fill="#70c050"
      />
      <ellipse cx="40" cy="48" rx="6" ry="4" fill="#58a840" />
      <ellipse cx="40" cy="72" rx="6" ry="4" fill="#58a840" />
      <ellipse cx="70" cy="46" rx="6" ry="4" fill="#58a840" />
      <ellipse cx="70" cy="74" rx="6" ry="4" fill="#58a840" />
      <circle cx="55" cy="56" r="3" fill="#e8f080" />
      <circle cx="72" cy="62" r="2.5" fill="#e8f080" />
    </>
  );
}

function BearFigure() {
  return (
    <>
      <ellipse cx="60" cy="76" rx="34" ry="26" fill="#8a6040" />
      <circle cx="60" cy="48" r="28" fill="#9a7050" />
      <circle cx="34" cy="28" r="12" fill="#8a6040" />
      <circle cx="86" cy="28" r="12" fill="#8a6040" />
      <circle cx="34" cy="28" r="6" fill="#d8b090" />
      <circle cx="86" cy="28" r="6" fill="#d8b090" />
      <circle cx="48" cy="46" r="5" fill="#fff" />
      <circle cx="72" cy="46" r="5" fill="#fff" />
      <circle cx="49" cy="47" r="2.8" fill="#2b2b2b" />
      <circle cx="73" cy="47" r="2.8" fill="#2b2b2b" />
      <ellipse cx="60" cy="60" rx="10" ry="8" fill="#d8b090" />
      <ellipse cx="60" cy="62" rx="5" ry="3.5" fill="#6a4830" />
    </>
  );
}

function WolfFigure() {
  return (
    <>
      <ellipse cx="58" cy="78" rx="30" ry="22" fill="#8a94a4" />
      <circle cx="60" cy="48" r="26" fill="#9aa4b4" />
      <path d="M36 34 L28 8 L52 38 Z" fill="#7a8494" />
      <path d="M84 34 L92 8 L68 38 Z" fill="#7a8494" />
      <path d="M36 30 L32 14 L48 34" fill="#c8d0d8" />
      <path d="M84 30 L88 14 L72 34" fill="#c8d0d8" />
      <circle cx="48" cy="46" r="4.5" fill="#fff" />
      <circle cx="72" cy="46" r="4.5" fill="#fff" />
      <circle cx="49" cy="47" r="2.5" fill="#2b2b2b" />
      <circle cx="73" cy="47" r="2.5" fill="#2b2b2b" />
      <ellipse cx="60" cy="58" rx="8" ry="5" fill="#6a7484" />
      <path
        d="M52 68 Q60 74 68 68"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  );
}

function OwlFigure() {
  return (
    <>
      <ellipse cx="60" cy="72" rx="30" ry="32" fill="#c89850" />
      <circle cx="60" cy="50" r="26" fill="#d8a860" />
      <path d="M38 30 L32 12 L48 28 Z" fill="#a87840" />
      <path d="M82 30 L88 12 L72 28 Z" fill="#a87840" />
      <circle cx="46" cy="48" r="12" fill="#fff" />
      <circle cx="74" cy="48" r="12" fill="#fff" />
      <circle cx="46" cy="48" r="6" fill="#2b2b2b" />
      <circle cx="74" cy="48" r="6" fill="#2b2b2b" />
      <path d="M60 58 L54 68 L66 68 Z" fill="#e89040" />
      <ellipse cx="60" cy="82" rx="12" ry="8" fill="#e8d0a0" />
    </>
  );
}

function BeeFigure() {
  return (
    <>
      <ellipse cx="60" cy="64" rx="28" ry="20" fill="#f0c040" />
      <path d="M40 52 L40 76 M52 48 L52 80 M68 48 L68 80 M80 52 L80 76" stroke="#2b2b2b" strokeWidth="5" strokeLinecap="round" />
      <circle cx="88" cy="56" r="12" fill="#3a3a3a" />
      <circle cx="92" cy="52" r="3" fill="#fff" />
      <circle cx="93" cy="53" r="1.8" fill="#2b2b2b" />
      <ellipse
        cx="42"
        cy="40"
        rx="16"
        ry="10"
        fill="#c8e8f8"
        opacity="0.85"
        transform="rotate(-20 42 40)"
      />
      <ellipse
        cx="70"
        cy="36"
        rx="16"
        ry="10"
        fill="#c8e8f8"
        opacity="0.85"
        transform="rotate(20 70 36)"
      />
      <path d="M98 58 L110 54" stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" />
    </>
  );
}

function WhaleFigure() {
  return (
    <>
      <ellipse cx="56" cy="64" rx="42" ry="26" fill="#5a80b0" />
      <path d="M90 56 Q112 40 116 58 Q112 78 90 70 Z" fill="#5a80b0" />
      <ellipse cx="36" cy="72" rx="14" ry="8" fill="#88a8c8" />
      <circle cx="30" cy="56" r="4" fill="#2b2b2b" />
      <path d="M18 48 Q14 36 22 40" fill="none" stroke="#88a8c8" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="50" cy="78" rx="12" ry="5" fill="#88a8c8" />
    </>
  );
}

function DolphinFigure() {
  return (
    <>
      <ellipse cx="58" cy="64" rx="38" ry="22" fill="#70a0c8" />
      <path d="M88 58 Q108 44 112 60 Q106 76 88 70 Z" fill="#70a0c8" />
      <path d="M50 44 L56 24 L66 48 Z" fill="#5a88b0" />
      <ellipse cx="40" cy="74" rx="12" ry="6" fill="#a0c8e0" />
      <circle cx="28" cy="58" r="3.5" fill="#2b2b2b" />
      <path
        d="M32 68 Q42 74 52 68"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  );
}

function CrowFigure() {
  return (
    <>
      <ellipse cx="52" cy="72" rx="28" ry="22" fill="#2a2a32" />
      <circle cx="78" cy="48" r="18" fill="#3a3a42" />
      <ellipse
        cx="36"
        cy="66"
        rx="14"
        ry="10"
        fill="#1a1a22"
        transform="rotate(-22 36 66)"
      />
      <path d="M94 50 L112 46 L98 62 Z" fill="#4a4a52" />
      <circle cx="84" cy="44" r="3.5" fill="#fff" />
      <circle cx="85" cy="45" r="2" fill="#2b2b2b" />
      <path
        d="M42 92 L38 110 M60 92 L66 110"
        stroke="#4a4a52"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function SwanFigure() {
  return (
    <>
      <ellipse cx="48" cy="78" rx="34" ry="22" fill="#f4f6fa" />
      <path
        d="M70 70 Q88 40 78 28 Q72 22 80 18"
        fill="none"
        stroke="#f4f6fa"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle cx="82" cy="18" r="10" fill="#f4f6fa" />
      <path d="M90 18 L104 16 L94 26 Z" fill="#f0a040" />
      <circle cx="86" cy="16" r="2.5" fill="#2b2b2b" />
      <ellipse
        cx="32"
        cy="72"
        rx="14"
        ry="9"
        fill="#e4e8f0"
        transform="rotate(-20 32 72)"
      />
    </>
  );
}

function GooseFigure() {
  return (
    <>
      <ellipse cx="50" cy="76" rx="30" ry="22" fill="#c8d0b8" />
      <ellipse cx="78" cy="48" rx="14" ry="20" fill="#d8e0c8" />
      <circle cx="82" cy="30" r="12" fill="#f0f0ec" />
      <path d="M92 32 L108 30 L96 42 Z" fill="#f08a2a" />
      <circle cx="86" cy="28" r="2.8" fill="#2b2b2b" />
      <ellipse
        cx="34"
        cy="70"
        rx="14"
        ry="9"
        fill="#a8b098"
        transform="rotate(-22 34 70)"
      />
      <path
        d="M42 96 L38 112 M60 96 L64 112"
        stroke="#f08a2a"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function PelicanFigure() {
  return (
    <>
      <ellipse cx="48" cy="72" rx="28" ry="22" fill="#f0e8d8" />
      <circle cx="74" cy="48" r="16" fill="#f8f0e0" />
      <path d="M88 50 L116 48 L100 72 L88 62 Z" fill="#f0c040" />
      <ellipse cx="100" cy="58" rx="10" ry="8" fill="#e8a030" />
      <circle cx="80" cy="44" r="3.5" fill="#2b2b2b" />
      <ellipse
        cx="32"
        cy="66"
        rx="14"
        ry="9"
        fill="#e0d8c8"
        transform="rotate(-20 32 66)"
      />
      <path
        d="M40 92 L36 110 M58 92 L62 110"
        stroke="#f0c040"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function SquirrelFigure() {
  return (
    <>
      <ellipse cx="56" cy="78" rx="24" ry="20" fill="#d08040" />
      <circle cx="70" cy="50" r="20" fill="#e09050" />
      <path
        d="M30 70 Q12 40 28 28 Q48 40 38 70"
        fill="#c07038"
      />
      <path d="M58 34 L52 16 L66 32 Z" fill="#d08040" />
      <circle cx="76" cy="46" r="3.5" fill="#fff" />
      <circle cx="77" cy="47" r="2" fill="#2b2b2b" />
      <ellipse cx="84" cy="56" rx="6" ry="4" fill="#f0b080" />
      <path
        d="M46 96 L42 112 M62 96 L66 112"
        stroke="#a06030"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function BoarFigure() {
  return (
    <>
      <ellipse cx="58" cy="76" rx="34" ry="24" fill="#7a6048" />
      <circle cx="60" cy="50" r="24" fill="#8a7058" />
      <ellipse cx="60" cy="62" rx="14" ry="10" fill="#6a5040" />
      <path d="M48 68 L42 80" stroke="#e8e0d0" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M72 68 L78 80" stroke="#e8e0d0" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="48" cy="46" r="4" fill="#fff" />
      <circle cx="72" cy="46" r="4" fill="#fff" />
      <circle cx="49" cy="47" r="2.2" fill="#2b2b2b" />
      <circle cx="73" cy="47" r="2.2" fill="#2b2b2b" />
      <ellipse cx="34" cy="40" rx="7" ry="9" fill="#7a6048" />
      <ellipse cx="86" cy="40" rx="7" ry="9" fill="#7a6048" />
      <path
        d="M40 98 L36 114 M58 100 L58 116 M76 98 L80 114"
        stroke="#5a4838"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}

function HedgehogFigure() {
  return (
    <>
      <ellipse cx="58" cy="72" rx="34" ry="26" fill="#c8a878" />
      <path d="M30 50 L24 28 L42 48 Z" fill="#8a7048" />
      <path d="M48 42 L46 18 L58 42 Z" fill="#8a7048" />
      <path d="M66 40 L70 16 L76 42 Z" fill="#8a7048" />
      <path d="M82 48 L92 28 L88 52 Z" fill="#8a7048" />
      <path d="M36 62 L20 50 L40 68 Z" fill="#9a8058" />
      <path d="M78 64 L98 54 L84 72 Z" fill="#9a8058" />
      <ellipse cx="78" cy="78" rx="16" ry="12" fill="#e8d0b0" />
      <circle cx="86" cy="74" r="3" fill="#2b2b2b" />
      <ellipse cx="94" cy="82" rx="5" ry="3" fill="#d8b090" />
      <path
        d="M42 94 L38 110 M58 96 L58 112"
        stroke="#8a7048"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function QuetzalFigure() {
  return (
    <>
      <ellipse cx="52" cy="60" rx="22" ry="18" fill="#20a060" />
      <circle cx="74" cy="42" r="16" fill="#30b870" />
      <path d="M40 70 Q36 100 48 110 Q56 100 52 78" fill="#28a868" />
      <path d="M48 72 Q52 105 60 112" fill="none" stroke="#e8d040" strokeWidth="5" strokeLinecap="round" />
      <ellipse
        cx="38"
        cy="54"
        rx="12"
        ry="8"
        fill="#e85060"
        transform="rotate(-20 38 54)"
      />
      <path d="M88 44 L104 40 L92 56 Z" fill="#f0c040" />
      <circle cx="80" cy="38" r="3.5" fill="#fff" />
      <circle cx="81" cy="39" r="2" fill="#2b2b2b" />
    </>
  );
}

function IbisFigure() {
  return (
    <>
      <ellipse cx="50" cy="72" rx="26" ry="20" fill="#e8e0f0" />
      <circle cx="76" cy="48" r="16" fill="#f0e8f8" />
      <path
        d="M90 50 Q108 40 112 58 Q100 62 92 58"
        fill="none"
        stroke="#c05080"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="82" cy="44" r="3.5" fill="#2b2b2b" />
      <ellipse
        cx="36"
        cy="66"
        rx="12"
        ry="8"
        fill="#d8d0e0"
        transform="rotate(-20 36 66)"
      />
      <path
        d="M42 90 L38 110 M60 90 L64 110"
        stroke="#c05080"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </>
  );
}

function CuckooFigure() {
  return (
    <>
      <ellipse cx="52" cy="70" rx="26" ry="20" fill="#889878" />
      <circle cx="76" cy="48" r="16" fill="#98a888" />
      <path d="M48 58 L52 78 M60 56 L64 76" stroke="#6a7860" strokeWidth="3" strokeLinecap="round" />
      <ellipse
        cx="38"
        cy="64"
        rx="12"
        ry="8"
        fill="#708060"
        transform="rotate(-20 38 64)"
      />
      <path d="M90 50 L106 48 L94 60 Z" fill="#c89050" />
      <circle cx="82" cy="44" r="3.5" fill="#fff" />
      <circle cx="83" cy="45" r="2" fill="#2b2b2b" />
      <path
        d="M44 88 L40 106 M60 88 L64 106"
        stroke="#c89050"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </>
  );
}

function BlackbirdFigure() {
  return (
    <>
      <ellipse cx="52" cy="72" rx="26" ry="20" fill="#2a2828" />
      <circle cx="76" cy="48" r="16" fill="#3a3838" />
      <ellipse
        cx="38"
        cy="66"
        rx="12"
        ry="8"
        fill="#1a1818"
        transform="rotate(-20 38 66)"
      />
      <path d="M90 50 L106 46 L94 60 Z" fill="#f0a040" />
      <circle cx="82" cy="44" r="3.5" fill="#fff" />
      <circle cx="83" cy="45" r="2" fill="#2b2b2b" />
      <ellipse cx="68" cy="58" rx="5" ry="3" fill="#f0a040" />
      <path
        d="M44 90 L40 108 M60 90 L64 108"
        stroke="#f0a040"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </>
  );
}

function BudgieFigure() {
  return (
    <>
      <ellipse cx="52" cy="70" rx="22" ry="18" fill="#90d040" />
      <circle cx="74" cy="48" r="14" fill="#a8e050" />
      <path d="M48 58 L52 78 M58 56 L62 76" stroke="#40a8d0" strokeWidth="3" strokeLinecap="round" />
      <ellipse
        cx="40"
        cy="64"
        rx="10"
        ry="7"
        fill="#70b830"
        transform="rotate(-18 40 64)"
      />
      <path d="M86 50 L100 48 L90 58 Z" fill="#f0a040" />
      <circle cx="80" cy="44" r="3" fill="#fff" />
      <circle cx="81" cy="45" r="1.8" fill="#2b2b2b" />
      <circle cx="70" cy="52" r="3.5" fill="#e85070" />
      <path
        d="M44 86 L40 102 M58 86 L62 102"
        stroke="#f0a040"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  );
}

function CondorFigure() {
  return (
    <>
      <ellipse cx="60" cy="72" rx="26" ry="20" fill="#3a3a3a" />
      <circle cx="60" cy="44" r="16" fill="#c85040" />
      <ellipse
        cx="28"
        cy="66"
        rx="22"
        ry="10"
        fill="#2a2a2a"
        transform="rotate(-28 28 66)"
      />
      <ellipse
        cx="92"
        cy="66"
        rx="22"
        ry="10"
        fill="#2a2a2a"
        transform="rotate(28 92 66)"
      />
      <circle cx="52" cy="42" r="3" fill="#2b2b2b" />
      <circle cx="68" cy="42" r="3" fill="#2b2b2b" />
      <path d="M60 52 L54 60 L66 60 Z" fill="#f0c040" />
      <ellipse cx="60" cy="36" rx="8" ry="4" fill="#e8d0b0" />
      <path
        d="M50 90 L46 110 M70 90 L74 110"
        stroke="#f0c040"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </>
  );
}

function LoonFigure() {
  return (
    <>
      <ellipse cx="52" cy="74" rx="32" ry="20" fill="#3a4a58" />
      <ellipse cx="78" cy="50" rx="14" ry="18" fill="#4a5a68" />
      <circle cx="82" cy="34" r="12" fill="#2a3a48" />
      <path d="M48 68 L56 78 M60 66 L68 78" stroke="#e8e8e8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M92 36 L106 34 L96 44 Z" fill="#f0a040" />
      <circle cx="86" cy="32" r="2.8" fill="#fff" />
      <circle cx="87" cy="33" r="1.6" fill="#2b2b2b" />
      <ellipse cx="40" cy="80" rx="10" ry="5" fill="#e8e8e8" />
    </>
  );
}

function NightingaleFigure() {
  return (
    <>
      <ellipse cx="52" cy="70" rx="24" ry="18" fill="#b89060" />
      <circle cx="74" cy="48" r="14" fill="#c8a070" />
      <ellipse
        cx="40"
        cy="64"
        rx="11"
        ry="7"
        fill="#a08050"
        transform="rotate(-18 40 64)"
      />
      <ellipse cx="58" cy="76" rx="10" ry="6" fill="#e8d0b0" />
      <path d="M86 50 L100 48 L90 58 Z" fill="#c88040" />
      <circle cx="80" cy="44" r="3" fill="#fff" />
      <circle cx="81" cy="45" r="1.8" fill="#2b2b2b" />
      <path
        d="M44 86 L40 102 M58 86 L62 102"
        stroke="#c88040"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </>
  );
}

export const FIGURES: Record<AnimalId, () => ReactElement> = {
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
  rooster: RoosterFigure,
  goat: GoatFigure,
  donkey: DonkeyFigure,
  turkey: TurkeyFigure,
  lion: LionFigure,
  elephant: ElephantFigure,
  monkey: MonkeyFigure,
  hyena: HyenaFigure,
  camel: CamelFigure,
  giraffe: GiraffeFigure,
  zebra: ZebraFigure,
  hippo: HippoFigure,
  flamingo: FlamingoFigure,
  hornbill: HornbillFigure,
  gibbon: GibbonFigure,
  eagle: EagleFigure,
  macaw: MacawFigure,
  parrot: ParrotFigure,
  parakeet: ParakeetFigure,
  howler: HowlerFigure,
  jaguar: JaguarFigure,
  hornero: HorneroFigure,
  potoo: PotooFigure,
  hoatzin: HoatzinFigure,
  gecko: GeckoFigure,
  bear: BearFigure,
  wolf: WolfFigure,
  owl: OwlFigure,
  bee: BeeFigure,
  whale: WhaleFigure,
  dolphin: DolphinFigure,
  crow: CrowFigure,
  swan: SwanFigure,
  goose: GooseFigure,
  pelican: PelicanFigure,
  squirrel: SquirrelFigure,
  boar: BoarFigure,
  hedgehog: HedgehogFigure,
  quetzal: QuetzalFigure,
  ibis: IbisFigure,
  cuckoo: CuckooFigure,
  blackbird: BlackbirdFigure,
  budgie: BudgieFigure,
  condor: CondorFigure,
  loon: LoonFigure,
  nightingale: NightingaleFigure,
};

export default FIGURES;
