/** Locale → display string (i18n prepared). */
export type LocalizedString = Record<string, string>;

export type LicenseTier = 'free' | 'module' | 'subscription' | 'school';

export type Difficulty = 1 | 2 | 3 | 4 | 5;

/**
 * A region on any map (state, country, biome polygon, fictional province…).
 * Geometry lives in the provider; this is the logical entity.
 */
export interface Region {
  id: string;
  /** Canonical names by locale, e.g. { 'pt-BR': 'Goiás' } */
  names: LocalizedString;
  /** Optional aliases accepted in text answers (normalized separately). */
  aliases?: LocalizedString[];
  parentId?: string | null;
  /** Theme-specific fields: capital, biome, energySource, etc. */
  attributes?: Record<string, string | number | boolean | null>;
  meta?: Record<string, unknown>;
}

/**
 * Geometry provider id — adapters know how to load + render.
 * Examples: 'brazil-svg', 'world-geojson', 'fantasy-svg'
 */
export type MapProviderId = string;

/**
 * A playable phase/fase: one map + one learning theme.
 * New content = new PhaseDefinition (data), not new engine code.
 *
 * Examples:
 * - Brazilian states (name the UF)
 * - Brazilian biomes
 * - Capitals of Brazilian states
 * - World countries
 * - Fantasy realm provinces
 */
export interface PhaseDefinition {
  id: string;
  moduleId: string;
  titleKey: string;
  descriptionKey: string;
  providerId: MapProviderId;
  /** Path or key used by the provider to load geometry. */
  geometryRef: string;
  licenseTier: LicenseTier;
  difficulty: Difficulty;
  categories: string[];
  /**
   * Which region field is the quiz target for this phase.
   * 'name' → region.names; otherwise region.attributes[quizAttribute].
   */
  quizAttribute: 'name' | string;
  regions: Region[];
  /** Solo modes enabled for this phase. */
  soloModes: string[];
  /** Multiplayer modes this phase can host (online only; future). */
  multiplayerModes: string[];
  defaultLocale: string;
}

export interface MapViewHints {
  selectedId?: string | null;
  accentId?: string | null;
  fillOverrides?: Record<string, string>;
  promptRegionId?: string | null;
}

export function getRegionLabel(
  region: Region,
  locale: string,
  fallbackLocale = 'pt-BR',
): string {
  return (
    region.names[locale] ??
    region.names[fallbackLocale] ??
    Object.values(region.names)[0] ??
    region.id
  );
}

export function getQuizAnswer(
  region: Region,
  quizAttribute: string,
  locale: string,
  fallbackLocale = 'pt-BR',
): string {
  if (quizAttribute === 'name') {
    return getRegionLabel(region, locale, fallbackLocale);
  }
  const raw = region.attributes?.[quizAttribute];
  return raw == null ? '' : String(raw);
}

export function listQuizAnswers(
  region: Region,
  quizAttribute: string,
  locale: string,
  fallbackLocale = 'pt-BR',
): string[] {
  const primary = getQuizAnswer(region, quizAttribute, locale, fallbackLocale);
  const answers = [primary];
  if (quizAttribute === 'name' && region.aliases) {
    for (const alias of region.aliases) {
      const value =
        alias[locale] ?? alias[fallbackLocale] ?? Object.values(alias)[0];
      if (value) answers.push(value);
    }
  }
  return answers.filter(Boolean);
}

export function findRegion(regions: Region[], id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

export function shuffleIds(ids: string[], random = Math.random): string[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
