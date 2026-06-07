import type { EvaluatedLetter } from "../lib/wordle";
import { MAX_GUESSES } from "../lib/wordle";
import { Row } from "./Row";

interface BoardProps {
  guesses: EvaluatedLetter[][];
  currentGuess: string;
  isPlaying: boolean;
}

export function Board({ guesses, currentGuess, isPlaying }: BoardProps) {
  const rows = [];

  for (let i = 0; i < MAX_GUESSES; i++) {
    if (i < guesses.length) {
      rows.push(<Row key={i} evaluated={guesses[i]} />);
    } else if (i === guesses.length && isPlaying) {
      rows.push(<Row key={i} current={currentGuess} />);
    } else {
      rows.push(<Row key={i} />);
    }
  }

  return <div className="board">{rows}</div>;
}
