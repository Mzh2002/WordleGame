import type { LetterStatus } from "../lib/wordle";

interface TileProps {
  letter: string;
  status: LetterStatus;
}

export function Tile({ letter, status }: TileProps) {
  const filled = letter !== "";
  return (
    <div
      className={`tile tile--${status}${filled ? " tile--filled" : ""}`}
      data-status={status}
    >
      {letter.toUpperCase()}
    </div>
  );
}
