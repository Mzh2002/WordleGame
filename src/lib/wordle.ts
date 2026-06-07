import { WORD_LENGTH } from "../data/words";

/** Evaluation status for a single guessed letter. */
export type LetterStatus = "correct" | "present" | "absent" | "empty";

export interface EvaluatedLetter {
  letter: string;
  status: LetterStatus;
}

export const MAX_GUESSES = 6;

export { WORD_LENGTH };

/**
 * Evaluates a guess against the answer using standard Wordle rules, correctly
 * handling duplicate letters:
 *  - "correct": right letter in the right position.
 *  - "present": letter is in the answer but in a different position.
 *  - "absent": letter is not in the answer (or all its occurrences are already
 *    accounted for by correct/present matches).
 */
export function evaluateGuess(
  guess: string,
  answer: string,
): EvaluatedLetter[] {
  const normalizedGuess = guess.toLowerCase();
  const normalizedAnswer = answer.toLowerCase();

  const result: EvaluatedLetter[] = normalizedGuess
    .split("")
    .map((letter) => ({ letter, status: "absent" as LetterStatus }));

  // Count remaining answer letters after removing exact matches.
  const remaining: Record<string, number> = {};
  for (let i = 0; i < normalizedAnswer.length; i++) {
    const answerLetter = normalizedAnswer[i];
    if (normalizedGuess[i] === answerLetter) {
      result[i].status = "correct";
    } else {
      remaining[answerLetter] = (remaining[answerLetter] ?? 0) + 1;
    }
  }

  // Mark present letters using the remaining counts.
  for (let i = 0; i < result.length; i++) {
    if (result[i].status === "correct") continue;
    const letter = result[i].letter;
    if ((remaining[letter] ?? 0) > 0) {
      result[i].status = "present";
      remaining[letter] -= 1;
    }
  }

  return result;
}

/**
 * Merges new letter statuses into the keyboard's known statuses, keeping the
 * strongest status for each letter (correct > present > absent).
 */
export function mergeKeyboardStatuses(
  current: Record<string, LetterStatus>,
  evaluated: EvaluatedLetter[],
): Record<string, LetterStatus> {
  const rank: Record<LetterStatus, number> = {
    correct: 3,
    present: 2,
    absent: 1,
    empty: 0,
  };
  const next = { ...current };
  for (const { letter, status } of evaluated) {
    const existing = next[letter];
    if (existing === undefined || rank[status] > rank[existing]) {
      next[letter] = status;
    }
  }
  return next;
}

/** True when every letter in the guess is correct. */
export function isWinningGuess(evaluated: EvaluatedLetter[]): boolean {
  return evaluated.every((entry) => entry.status === "correct");
}
