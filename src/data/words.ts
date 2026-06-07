// Word data for the Wordle game.
//
// `ANSWERS` is the pool of possible solutions. `ALLOWED_GUESSES` contains
// additional words that are accepted as valid guesses but never chosen as the
// answer. A guess is valid if it appears in either list.
//
// This is intentionally a small starter list to keep the framework lightweight.
// Expand these arrays (or load them from an API/file) to grow the dictionary.

export const WORD_LENGTH = 5;

export const ANSWERS: string[] = [
  "apple",
  "brave",
  "crane",
  "drone",
  "eagle",
  "flame",
  "grape",
  "house",
  "ivory",
  "joker",
  "knife",
  "lemon",
  "mango",
  "noble",
  "ocean",
  "piano",
  "quilt",
  "robot",
  "stone",
  "tiger",
  "ultra",
  "vivid",
  "wheat",
  "xenon",
  "yacht",
  "zebra",
];

export const ALLOWED_GUESSES: string[] = [
  "about",
  "alert",
  "beach",
  "bread",
  "chair",
  "cloud",
  "dance",
  "earth",
  "fairy",
  "ghost",
  "heart",
  "input",
  "light",
  "mouse",
  "night",
  "plant",
  "river",
  "sugar",
  "train",
  "water",
];

const VALID_WORDS = new Set<string>(
  [...ANSWERS, ...ALLOWED_GUESSES].map((w) => w.toLowerCase()),
);

/** Returns true if the given word is an accepted guess. */
export function isValidWord(word: string): boolean {
  return VALID_WORDS.has(word.toLowerCase());
}

/** Picks a pseudo-random answer from the answer pool. */
export function getRandomAnswer(): string {
  const index = Math.floor(Math.random() * ANSWERS.length);
  return ANSWERS[index].toLowerCase();
}
