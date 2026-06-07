// Word data for the Wordle game.
//
// The word lists are bundled from plain-text files (one word per line):
//  - `answers.txt`  — the official Wordle solution pool (~2,300 words).
//  - `allowed.txt`  — additional words accepted as guesses but never chosen
//    as the answer (~10,600 words).
//
// A guess is valid if it appears in either list. To grow the dictionary,
// edit those text files rather than this module.

import answersRaw from "./answers.txt?raw";
import allowedRaw from "./allowed.txt?raw";

export const WORD_LENGTH = 5;

function parseWords(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length === WORD_LENGTH);
}

export const ANSWERS: string[] = parseWords(answersRaw);

export const ALLOWED_GUESSES: string[] = parseWords(allowedRaw);

const VALID_WORDS = new Set<string>([...ANSWERS, ...ALLOWED_GUESSES]);

/** Returns true if the given word is an accepted guess. */
export function isValidWord(word: string): boolean {
  return VALID_WORDS.has(word.toLowerCase());
}

/** Picks a pseudo-random answer from the answer pool. */
export function getRandomAnswer(): string {
  const index = Math.floor(Math.random() * ANSWERS.length);
  return ANSWERS[index];
}
