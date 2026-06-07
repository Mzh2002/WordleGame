import { useCallback, useState } from "react";
import {
  type EvaluatedLetter,
  type LetterStatus,
  MAX_GUESSES,
  WORD_LENGTH,
  evaluateGuess,
  isWinningGuess,
  mergeKeyboardStatuses,
} from "../lib/wordle";
import { getRandomAnswer, isValidWord } from "../data/words";

export type GameStatus = "playing" | "won" | "lost";

export interface WordleState {
  /** Completed, evaluated guesses. */
  guesses: EvaluatedLetter[][];
  /** The guess currently being typed (not yet submitted). */
  currentGuess: string;
  status: GameStatus;
  /** Per-letter status for coloring the on-screen keyboard. */
  keyboardStatuses: Record<string, LetterStatus>;
  /** The solution; exposed so the UI can reveal it when the game is lost. */
  answer: string;
  /** Transient message shown to the player (e.g. validation errors). */
  message: string;
}

export interface WordleApi extends WordleState {
  addLetter: (letter: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  reset: () => void;
}

function createInitialState(): WordleState {
  return {
    guesses: [],
    currentGuess: "",
    status: "playing",
    keyboardStatuses: {},
    answer: getRandomAnswer(),
    message: "",
  };
}

export function useWordle(): WordleApi {
  const [state, setState] = useState<WordleState>(createInitialState);

  const addLetter = useCallback((letter: string) => {
    const normalized = letter.toLowerCase();
    if (!/^[a-z]$/.test(normalized)) return;
    setState((prev) => {
      if (prev.status !== "playing") return prev;
      if (prev.currentGuess.length >= WORD_LENGTH) return prev;
      return {
        ...prev,
        currentGuess: prev.currentGuess + normalized,
        message: "",
      };
    });
  }, []);

  const removeLetter = useCallback(() => {
    setState((prev) => {
      if (prev.status !== "playing") return prev;
      return {
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
        message: "",
      };
    });
  }, []);

  const submitGuess = useCallback(() => {
    setState((prev) => {
      if (prev.status !== "playing") return prev;

      if (prev.currentGuess.length < WORD_LENGTH) {
        return { ...prev, message: "Not enough letters" };
      }
      if (!isValidWord(prev.currentGuess)) {
        return { ...prev, message: "Not in word list" };
      }

      const evaluated = evaluateGuess(prev.currentGuess, prev.answer);
      const guesses = [...prev.guesses, evaluated];
      const keyboardStatuses = mergeKeyboardStatuses(
        prev.keyboardStatuses,
        evaluated,
      );

      let status: GameStatus = "playing";
      let message = "";
      if (isWinningGuess(evaluated)) {
        status = "won";
        message = "You win!";
      } else if (guesses.length >= MAX_GUESSES) {
        status = "lost";
        message = `The word was ${prev.answer.toUpperCase()}`;
      }

      return {
        ...prev,
        guesses,
        currentGuess: "",
        keyboardStatuses,
        status,
        message,
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState(createInitialState());
  }, []);

  return { ...state, addLetter, removeLetter, submitGuess, reset };
}
