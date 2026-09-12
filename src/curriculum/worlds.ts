export type ActivityType = 'ListenChoose' | 'BuildSyllable' | 'BuildWord' | 'ReadFind' | 'CompleteWord' | 'ReadingComprehension';

export interface Activity {
  id: string;
  type: ActivityType;
  target: string;
  options?: string[]; 
  image?: string; 
  audio?: string; 
  correctAnswer: string;
  parts?: string[]; 
}

export interface World {
  id: string;
  title: string;
  description: string;
  unlockedLetters: string[];
  activities: Activity[];
}

export const curriculum: World[] = [
  {
    id: 'world-0',
    title: 'Mundo 0: Los Sonidos',
    description: 'Aprende a escuchar.',
    unlockedLetters: [],
    activities: [
      { id: 'w0-a1', type: 'ListenChoose', target: 'a', options: ['a', 'e', 'o'], correctAnswer: 'a' },
      { id: 'w0-a2', type: 'ListenChoose', target: 'o', options: ['i', 'o', 'u'], correctAnswer: 'o' }
    ]
  },
  {
    id: 'world-1',
    title: 'Mundo 1: Las Vocales',
    description: 'A, E, I, O, U',
    unlockedLetters: ['a', 'e', 'i', 'o', 'u'],
    activities: [
      { id: 'w1-a1', type: 'ReadFind', target: 'a', options: ['abeja', 'elefante', 'oso'], correctAnswer: 'abeja' },
      { id: 'w1-a2', type: 'ListenChoose', target: 'e', options: ['a', 'e', 'i'], correctAnswer: 'e' }
    ]
  },
  {
    id: 'world-2',
    title: 'Mundo 2: La letra P',
    description: 'PA, PE, PI, PO, PU',
    unlockedLetters: ['a', 'e', 'i', 'o', 'u', 'p'],
    activities: [
      { id: 'w2-a1', type: 'BuildSyllable', target: 'pa', parts: ['p', 'a'], correctAnswer: 'pa' },
      { id: 'w2-a2', type: 'BuildWord', target: 'papa', parts: ['pa', 'pa'], correctAnswer: 'papa' }
    ]
  },
  {
    id: 'world-3',
    title: 'Mundo 3: La letra L',
    description: 'LA, LE, LI, LO, LU',
    unlockedLetters: ['a', 'e', 'i', 'o', 'u', 'p', 'l'],
    activities: [
      { id: 'w3-a1', type: 'BuildSyllable', target: 'la', parts: ['l', 'a'], correctAnswer: 'la' },
      { id: 'w3-a2', type: 'BuildWord', target: 'palo', parts: ['pa', 'lo'], correctAnswer: 'palo' },
      { id: 'w3-a3', type: 'ReadFind', target: 'pelo', options: ['pelo', 'lupa', 'pila'], correctAnswer: 'pelo' }
    ]
  },
  {
    id: 'world-4',
    title: 'Mundo 4: La letra M',
    description: 'MA, ME, MI, MO, MU',
    unlockedLetters: ['a', 'e', 'i', 'o', 'u', 'p', 'l', 'm'],
    activities: [
      { id: 'w4-a1', type: 'BuildSyllable', target: 'ma', parts: ['m', 'a'], correctAnswer: 'ma' },
      { id: 'w4-a2', type: 'BuildWord', target: 'malo', parts: ['ma', 'lo'], correctAnswer: 'malo' },
      { id: 'w4-a3', type: 'CompleteWord', target: 'pa__ma', options: ['lo', 'la', 'le'], correctAnswer: 'lo' }
    ]
  },
  {
    id: 'world-5',
    title: 'Mundo 5: La letra S',
    description: 'SA, SE, SI, SO, SU',
    unlockedLetters: ['a', 'e', 'i', 'o', 'u', 'p', 'l', 'm', 's'],
    activities: [
      { id: 'w5-a1', type: 'BuildWord', target: 'sapo', parts: ['sa', 'po'], correctAnswer: 'sapo' },
      { id: 'w5-a2', type: 'ReadFind', target: 'mesa', options: ['mesa', 'misa', 'masa'], correctAnswer: 'mesa' }
    ]
  },
  {
    id: 'world-6',
    title: 'Mundo 6: Primeras Lecturas',
    description: 'Leemos frases cortas',
    unlockedLetters: ['a', 'e', 'i', 'o', 'u', 'p', 'l', 'm', 's'],
    activities: [
      { id: 'w6-a1', type: 'ReadingComprehension', target: 'El sapo salta', options: ['sapo_saltando', 'sapo_durmiendo', 'palo'], correctAnswer: 'sapo_saltando' },
      { id: 'w6-a2', type: 'ReadingComprehension', target: 'La paloma pasea', options: ['paloma_paseando', 'sapo_saltando', 'mesa'], correctAnswer: 'paloma_paseando' }
    ]
  }
];
