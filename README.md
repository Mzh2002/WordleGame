# Wordle Game

A web-based clone of the classic Wordle word game, built with **React**,
**TypeScript**, and **Vite**.

Guess the hidden five-letter word in six tries. After each guess, the tiles
change color to show how close you are:

- 🟩 **Green** – correct letter in the correct spot.
- 🟨 **Yellow** – letter is in the word but in the wrong spot.
- ⬜ **Gray** – letter is not in the word.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Project structure

```
src/
  components/      Presentational UI pieces
    Board.tsx        The 6x5 grid of guesses
    Row.tsx          A single row of tiles
    Tile.tsx         A single letter tile
    Keyboard.tsx     On-screen keyboard with letter states
  hooks/
    useWordle.ts     Game state + actions (add/remove letter, submit, reset)
  lib/
    wordle.ts        Pure game logic (guess evaluation, win check)
  data/
    words.ts         Answer pool and allowed-guess dictionary
  App.tsx          Wires everything together + physical keyboard input
  index.css        Global styles / theme variables
  App.css          Component styles
```

## How it works

- `lib/wordle.ts` contains the pure, framework-agnostic game rules, including
  correct handling of duplicate letters when evaluating a guess.
- `hooks/useWordle.ts` owns all mutable game state and exposes a small API
  (`addLetter`, `removeLetter`, `submitGuess`, `reset`).
- The components are purely presentational and driven by that state.

## Extending the game

- **Bigger dictionary:** expand `ANSWERS` and `ALLOWED_GUESSES` in
  `src/data/words.ts` (or load words from a file/API).
- **Different word length / guess count:** adjust `WORD_LENGTH` in
  `src/data/words.ts` and `MAX_GUESSES` in `src/lib/wordle.ts`.
