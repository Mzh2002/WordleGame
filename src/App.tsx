import { useCallback, useEffect } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { Keyboard } from "./components/Keyboard";
import { useWordle } from "./hooks/useWordle";

function App() {
  const {
    guesses,
    currentGuess,
    status,
    keyboardStatuses,
    message,
    addLetter,
    removeLetter,
    submitGuess,
    reset,
  } = useWordle();

  const handleKey = useCallback(
    (key: string) => {
      if (key === "Enter") {
        submitGuess();
      } else if (key === "Backspace") {
        removeLetter();
      } else {
        addLetter(key);
      }
    },
    [submitGuess, removeLetter, addLetter],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      handleKey(event.key);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Wordle</h1>
      </header>

      <main className="app__main">
        <Board
          guesses={guesses}
          currentGuess={currentGuess}
          isPlaying={status === "playing"}
        />

        {message && <p className="app__message">{message}</p>}

        {status !== "playing" && (
          <button type="button" className="app__reset" onClick={reset}>
            Play again
          </button>
        )}
      </main>

      <footer className="app__footer">
        <Keyboard statuses={keyboardStatuses} onKey={handleKey} />
      </footer>
    </div>
  );
}

export default App;
