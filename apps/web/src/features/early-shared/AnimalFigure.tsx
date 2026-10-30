/** Shared animal figure SVG for every early-years “Animais” activity. */

import type { AnimalId } from './animalCatalog';
import FIGURES from './animalFigures';

export type { AnimalId, AnimalVisual } from './animalCatalog';
export { EARLY_ANIMALS } from './animalCatalog';

export function AnimalFigure({ id }: { id: AnimalId }) {
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
