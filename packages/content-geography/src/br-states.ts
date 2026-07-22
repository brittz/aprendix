import type { PhaseDefinition, Region } from '@aprendix/map-engine';

/** Official UF metadata for the free BR-states phase. */
const BR_STATES: Array<{
  id: string;
  name: string;
  capital: string;
  region: string;
  aliases?: string[];
}> = [
  { id: 'AC', name: 'Acre', capital: 'Rio Branco', region: 'N' },
  { id: 'AL', name: 'Alagoas', capital: 'Maceió', region: 'NE' },
  { id: 'AP', name: 'Amapá', capital: 'Macapá', region: 'N' },
  { id: 'AM', name: 'Amazonas', capital: 'Manaus', region: 'N' },
  { id: 'BA', name: 'Bahia', capital: 'Salvador', region: 'NE' },
  { id: 'CE', name: 'Ceará', capital: 'Fortaleza', region: 'NE' },
  { id: 'DF', name: 'Distrito Federal', capital: 'Brasília', region: 'CO', aliases: ['Brasilia', 'DF'] },
  { id: 'ES', name: 'Espírito Santo', capital: 'Vitória', region: 'SE', aliases: ['Espirito Santo'] },
  { id: 'GO', name: 'Goiás', capital: 'Goiânia', region: 'CO', aliases: ['Goias'] },
  { id: 'MA', name: 'Maranhão', capital: 'São Luís', region: 'NE', aliases: ['Maranhao'] },
  { id: 'MT', name: 'Mato Grosso', capital: 'Cuiabá', region: 'CO' },
  { id: 'MS', name: 'Mato Grosso do Sul', capital: 'Campo Grande', region: 'CO' },
  { id: 'MG', name: 'Minas Gerais', capital: 'Belo Horizonte', region: 'SE' },
  { id: 'PA', name: 'Pará', capital: 'Belém', region: 'N', aliases: ['Para'] },
  { id: 'PB', name: 'Paraíba', capital: 'João Pessoa', region: 'NE', aliases: ['Paraiba'] },
  { id: 'PR', name: 'Paraná', capital: 'Curitiba', region: 'S', aliases: ['Parana'] },
  { id: 'PE', name: 'Pernambuco', capital: 'Recife', region: 'NE' },
  { id: 'PI', name: 'Piauí', capital: 'Teresina', region: 'NE', aliases: ['Piaui'] },
  { id: 'RJ', name: 'Rio de Janeiro', capital: 'Rio de Janeiro', region: 'SE' },
  { id: 'RN', name: 'Rio Grande do Norte', capital: 'Natal', region: 'NE' },
  { id: 'RS', name: 'Rio Grande do Sul', capital: 'Porto Alegre', region: 'S' },
  { id: 'RO', name: 'Rondônia', capital: 'Porto Velho', region: 'N', aliases: ['Rondonia'] },
  { id: 'RR', name: 'Roraima', capital: 'Boa Vista', region: 'N' },
  { id: 'SC', name: 'Santa Catarina', capital: 'Florianópolis', region: 'S' },
  { id: 'SP', name: 'São Paulo', capital: 'São Paulo', region: 'SE', aliases: ['Sao Paulo'] },
  { id: 'SE', name: 'Sergipe', capital: 'Aracaju', region: 'NE' },
  { id: 'TO', name: 'Tocantins', capital: 'Palmas', region: 'N' },
];

function toRegions(): Region[] {
  return BR_STATES.map((state) => ({
    id: state.id,
    names: { 'pt-BR': state.name, en: state.name },
    aliases: state.aliases?.map((alias) => ({ 'pt-BR': alias, en: alias })),
    attributes: {
      capital: state.capital,
      macroRegion: state.region,
    },
  }));
}

/**
 * Phase: Brazilian states — learn UF names on the Brazil SVG map.
 * Free tier. Future phases (biomes, capitals-as-quiz, energy) are new entries.
 */
export const BR_STATES_PHASE: PhaseDefinition = {
  id: 'geo-br-states',
  moduleId: 'geography',
  titleKey: 'phases.brStates.title',
  descriptionKey: 'phases.brStates.description',
  providerId: 'brazil-svg',
  geometryRef: '/data/brazil-states.json',
  licenseTier: 'free',
  difficulty: 2,
  categories: ['geography', 'brazil', 'states'],
  quizAttribute: 'name',
  regions: toRegions(),
  soloModes: ['train', 'find', 'name'],
  multiplayerModes: ['claim'],
  defaultLocale: 'pt-BR',
};

export const GEOGRAPHY_PHASES: PhaseDefinition[] = [BR_STATES_PHASE];

export function getPhaseById(id: string): PhaseDefinition | undefined {
  return GEOGRAPHY_PHASES.find((phase) => phase.id === id);
}

export function listFreePhases(): PhaseDefinition[] {
  return GEOGRAPHY_PHASES.filter((phase) => phase.licenseTier === 'free');
}
