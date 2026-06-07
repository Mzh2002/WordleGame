import type { LetterStatus } from "../lib/wordle";

interface TileProps {
  letter: string;
  status: LetterStatus;
  /** Whether the typing cursor currently sits on this tile. */
  cursor?: boolean;
}

export function Tile({ letter, status, cursor = false }: TileProps) {
  const filled = letter !== "";
  return (
    <div
      className={`tile tile--${status}${filled ? " tile--filled" : ""}${
        cursor ? " tile--cursor" : ""
      }`}
      data-status={status}
    >
      {filled ? letter.toUpperCase() : cursor ? <span className="caret" /> : ""}
    </div>
  );
}
