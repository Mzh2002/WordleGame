import type { EvaluatedLetter } from "../lib/wordle";
import { WORD_LENGTH } from "../lib/wordle";
import { Tile } from "./Tile";

interface RowProps {
  /** Evaluated letters for a submitted guess, if any. */
  evaluated?: EvaluatedLetter[];
  /** Raw text for the in-progress row, if any. */
  current?: string;
  /** Index of the tile the typing cursor sits on (active row only). */
  cursorIndex?: number;
}

export function Row({ evaluated, current, cursorIndex }: RowProps) {
  const tiles: EvaluatedLetter[] = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (evaluated) {
      tiles.push(evaluated[i]);
    } else if (current !== undefined) {
      tiles.push({ letter: current[i] ?? "", status: "empty" });
    } else {
      tiles.push({ letter: "", status: "empty" });
    }
  }

  return (
    <div className="row">
      {tiles.map((tile, i) => (
        <Tile
          key={i}
          letter={tile.letter}
          status={tile.status}
          cursor={cursorIndex === i}
        />
      ))}
    </div>
  );
}
