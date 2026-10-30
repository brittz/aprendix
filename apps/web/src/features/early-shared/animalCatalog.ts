/** Catalog of early-years animals: farm, Brazilian fauna, African fauna, and more. */

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
  | 'chicken'
  | 'rooster'
  | 'goat'
  | 'donkey'
  | 'turkey'
  | 'lion'
  | 'elephant'
  | 'monkey'
  | 'hyena'
  | 'camel'
  | 'giraffe'
  | 'zebra'
  | 'hippo'
  | 'flamingo'
  | 'hornbill'
  | 'gibbon'
  | 'eagle'
  | 'macaw'
  | 'parrot'
  | 'parakeet'
  | 'howler'
  | 'jaguar'
  | 'hornero'
  | 'potoo'
  | 'hoatzin'
  | 'gecko'
  | 'bear'
  | 'wolf'
  | 'owl'
  | 'bee'
  | 'whale'
  | 'dolphin'
  | 'crow'
  | 'swan'
  | 'goose'
  | 'pelican'
  | 'squirrel'
  | 'boar'
  | 'hedgehog'
  | 'quetzal'
  | 'ibis'
  | 'cuckoo'
  | 'blackbird'
  | 'budgie'
  | 'condor'
  | 'loon'
  | 'nightingale';

export interface AnimalVisual {
  id: AnimalId;
  label: string;
  bg: string;
  /** Optional region hint for caregivers / future filters. */
  region?: 'farm' | 'brazil' | 'africa' | 'wild' | 'ocean' | 'birds';
}

export const EARLY_ANIMALS: AnimalVisual[] = [
  // Farm & familiar
  { id: 'cat', label: 'Gato', bg: '#ffe8c8', region: 'farm' },
  { id: 'dog', label: 'Cão', bg: '#f3e0c8', region: 'farm' },
  { id: 'bird', label: 'Pássaro', bg: '#d7eef8', region: 'birds' },
  { id: 'cow', label: 'Vaca', bg: '#eceae6', region: 'farm' },
  { id: 'frog', label: 'Sapo', bg: '#dff0d8', region: 'farm' },
  { id: 'duck', label: 'Pato', bg: '#fff3c4', region: 'farm' },
  { id: 'pig', label: 'Porco', bg: '#f9d6e3', region: 'farm' },
  { id: 'horse', label: 'Cavalo', bg: '#e8d5c4', region: 'farm' },
  { id: 'sheep', label: 'Ovelha', bg: '#eef2f7', region: 'farm' },
  { id: 'chicken', label: 'Galinha', bg: '#ffe6d2', region: 'farm' },
  { id: 'rooster', label: 'Galo', bg: '#ffd0c0', region: 'farm' },
  { id: 'turkey', label: 'Peru', bg: '#f5dcc8', region: 'farm' },
  { id: 'goat', label: 'Cabra', bg: '#efe6d8', region: 'farm' },
  { id: 'donkey', label: 'Burro', bg: '#e5ddd2', region: 'farm' },

  // Africa
  { id: 'lion', label: 'Leão', bg: '#ffe2b8', region: 'africa' },
  { id: 'elephant', label: 'Elefante', bg: '#e4e8ee', region: 'africa' },
  { id: 'monkey', label: 'Macaco', bg: '#f3e0c4', region: 'africa' },
  { id: 'hyena', label: 'Hiena', bg: '#f0e0c8', region: 'africa' },
  { id: 'camel', label: 'Camelo', bg: '#f3e6d0', region: 'africa' },
  { id: 'giraffe', label: 'Girafa', bg: '#ffe8c4', region: 'africa' },
  { id: 'zebra', label: 'Zebra', bg: '#f4f4f6', region: 'africa' },
  { id: 'hippo', label: 'Hipopótamo', bg: '#e8d8e4', region: 'africa' },
  { id: 'flamingo', label: 'Flamingo', bg: '#ffd6e8', region: 'africa' },
  { id: 'hornbill', label: 'Calau', bg: '#fff0d0', region: 'africa' },
  { id: 'gibbon', label: 'Gibão', bg: '#f0dcc8', region: 'africa' },
  { id: 'eagle', label: 'Águia', bg: '#e8e0d4', region: 'africa' },

  // Brazil / Neotropics
  { id: 'macaw', label: 'Arara', bg: '#d8f0ff', region: 'brazil' },
  { id: 'parrot', label: 'Papagaio', bg: '#d8f8d8', region: 'brazil' },
  { id: 'parakeet', label: 'Periquito', bg: '#e0f8d0', region: 'brazil' },
  { id: 'howler', label: 'Guariba', bg: '#f0e0d0', region: 'brazil' },
  { id: 'jaguar', label: 'Onça', bg: '#ffe6b0', region: 'brazil' },
  { id: 'hornero', label: 'João-de-barro', bg: '#f5e6d4', region: 'brazil' },
  { id: 'potoo', label: 'Urutau', bg: '#e8e4d8', region: 'brazil' },
  { id: 'hoatzin', label: 'Cigana', bg: '#e8f0d8', region: 'brazil' },
  { id: 'gecko', label: 'Lagartixa', bg: '#e0f0d8', region: 'brazil' },
  { id: 'quetzal', label: 'Quetzal', bg: '#d8f8e8', region: 'brazil' },

  // Wild & ocean & more birds
  { id: 'bear', label: 'Urso', bg: '#e8d8c8', region: 'wild' },
  { id: 'wolf', label: 'Lobo', bg: '#e4e8ee', region: 'wild' },
  { id: 'owl', label: 'Coruja', bg: '#efe6d4', region: 'birds' },
  { id: 'bee', label: 'Abelha', bg: '#fff3b0', region: 'farm' },
  { id: 'whale', label: 'Baleia', bg: '#d8e8f8', region: 'ocean' },
  { id: 'dolphin', label: 'Golfinho', bg: '#d0e8f8', region: 'ocean' },
  { id: 'crow', label: 'Corvo', bg: '#e4e4ea', region: 'birds' },
  { id: 'swan', label: 'Cisne', bg: '#f4f6fa', region: 'birds' },
  { id: 'goose', label: 'Ganso', bg: '#e8f0e0', region: 'birds' },
  { id: 'pelican', label: 'Pelicano', bg: '#fff0d8', region: 'birds' },
  { id: 'squirrel', label: 'Esquilo', bg: '#f5e0c8', region: 'wild' },
  { id: 'boar', label: 'Javali', bg: '#e8dcc8', region: 'wild' },
  { id: 'hedgehog', label: 'Ouriço', bg: '#ebe4d8', region: 'wild' },
  { id: 'ibis', label: 'Íbis', bg: '#f0e8f8', region: 'birds' },
  { id: 'cuckoo', label: 'Cuco', bg: '#e8f0e8', region: 'birds' },
  { id: 'blackbird', label: 'Melro', bg: '#e8e4e0', region: 'birds' },
  { id: 'budgie', label: 'Periquito-australiano', bg: '#e8f8d8', region: 'birds' },
  { id: 'condor', label: 'Condor', bg: '#e8e4dc', region: 'birds' },
  { id: 'loon', label: 'Mergulhão', bg: '#dce8f0', region: 'birds' },
  { id: 'nightingale', label: 'Rouxinol', bg: '#e8f0e4', region: 'birds' },
];

/** Audio sample paths keyed by AnimalId. Missing entries fall back to synth. */
export const ANIMAL_SAMPLE_FILES: Partial<Record<AnimalId, string>> = {
  cat: '/audio/animals/cat.ogg',
  dog: '/audio/animals/dog.ogg',
  bird: '/audio/animals/bird.oga',
  cow: '/audio/animals/cow.ogg',
  frog: '/audio/animals/frog.oga',
  duck: '/audio/animals/duck.wav',
  pig: '/audio/animals/pig.ogg',
  horse: '/audio/animals/horse.ogg',
  sheep: '/audio/animals/sheep.ogg',
  chicken: '/audio/animals/chicken.ogg',
  rooster: '/audio/animals/rooster.oga',
  turkey: '/audio/animals/turkey.ogg',
  goat: '/audio/animals/goat.ogg',
  donkey: '/audio/animals/donkey.wav',
  lion: '/audio/animals/lion.ogg',
  elephant: '/audio/animals/elephant.ogg',
  monkey: '/audio/animals/monkey.oga',
  hyena: '/audio/animals/hyena.ogg',
  camel: '/audio/animals/camel.wav',
  hornbill: '/audio/animals/hornbill.wav',
  gibbon: '/audio/animals/gibbon.ogg',
  eagle: '/audio/animals/eagle.ogg',
  macaw: '/audio/animals/macaw.ogg',
  parrot: '/audio/animals/parrot.ogg',
  parakeet: '/audio/animals/parakeet.ogg',
  howler: '/audio/animals/howler.ogg',
  jaguar: '/audio/animals/jaguar.flac',
  hornero: '/audio/animals/hornero.ogg',
  potoo: '/audio/animals/potoo.ogg',
  hoatzin: '/audio/animals/hoatzin.mp3',
  gecko: '/audio/animals/gecko.wav',
  bear: '/audio/animals/bear.ogg',
  wolf: '/audio/animals/wolf.ogg',
  owl: '/audio/animals/owl.ogg',
  bee: '/audio/animals/bee.opus',
  whale: '/audio/animals/whale.ogg',
  dolphin: '/audio/animals/dolphin.wav',
  crow: '/audio/animals/crow.ogg',
  swan: '/audio/animals/swan.ogg',
  goose: '/audio/animals/goose.ogg',
  pelican: '/audio/animals/pelican.ogg',
  squirrel: '/audio/animals/squirrel.oga',
  boar: '/audio/animals/boar.ogg',
  hedgehog: '/audio/animals/hedgehog.ogg',
  quetzal: '/audio/animals/quetzal.ogg',
  ibis: '/audio/animals/ibis.ogg',
  cuckoo: '/audio/animals/cuckoo.ogg',
  blackbird: '/audio/animals/blackbird.ogg',
  budgie: '/audio/animals/budgie.ogg',
  condor: '/audio/animals/condor.ogg',
  loon: '/audio/animals/loon.ogg',
  nightingale: '/audio/animals/nightingale.ogg',
  // giraffe / zebra / hippo / flamingo: mostly silent or rare samples → synth
};
