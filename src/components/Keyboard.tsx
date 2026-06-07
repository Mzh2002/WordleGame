import type { LetterStatus } from "../lib/wordle";

const ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];

interface KeyboardProps {
  statuses: Record<string, LetterStatus>;
  onKey: (key: string) => void;
}

export function Keyboard({ statuses, onKey }: KeyboardProps) {
  return (
    <div className="keyboard">
      {ROWS.map((row, rowIndex) => (
        <div className="keyboard__row" key={rowIndex}>
          {rowIndex === ROWS.length - 1 && (
            <button
              type="button"
              className="key key--wide"
              onClick={() => onKey("Enter")}
            >
              Enter
            </button>
          )}
          {row.split("").map((letter) => {
            const status = statuses[letter] ?? "empty";
            return (
              <button
                type="button"
                key={letter}
                className={`key key--${status}`}
                onClick={() => onKey(letter)}
              >
                {letter.toUpperCase()}
              </button>
            );
          })}
          {rowIndex === ROWS.length - 1 && (
            <button
              type="button"
              className="key key--wide"
              onClick={() => onKey("Backspace")}
            >
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
