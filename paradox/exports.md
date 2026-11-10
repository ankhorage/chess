# Public API

## Board

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:33:1`

A rectangular board containing fixed pieces.

## Castling

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:24:1`

Per-color castling rights.

## Cell

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:10:1`

A serializable starting-board cell.

## ChessEngine

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:64:1`

The canonical public API of the headless rules engine.

## ChoiceCoin

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:8:1`

A Choice Coin that resolves before normal play.

## ChoiceCoinSetup

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:58:1`

A server-persistable Choice Coin setup with immutable locks per player.

## Color

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:2:1`

A chess side.

## createChessEngine

Kind: `function`
Module: `src/features/chess/domain/createChessEngine.ts`
Source: `src/features/chess/domain/createChessEngine.ts:15:1`

Create the sole framework-independent boundary for configurable chess rules.

### Signatures

- `() => Readonly<{ createChoiceCoinSetup: (template: import("../../..").Template) => import("../../..").ChoiceCoinSetup; createFreeChoiceCoinPreset: () => import("../../..").Template; lockChoiceCoins: (setup: import("../../..").ChoiceCoinSetup, color: import("../../..").Color, choices: Readonly<Record<string, import("../../..").PieceKind>>) => import("../../..").ChoiceCoinSetup; createPresets: () => readonly import("../../..").Template[]; getCheckedKingPositions: (board: import("../../..").Board) => readonly import("../../..").Position[]; getLegalMoves: (state: import("../../..").GameState, origin?: import("../../..").Position) => readonly import("../../..").Move[]; isKingInCheck: (board: import("../../..").Board, color: import("../../..").Color) => boolean; playMove: (state: import("../../..").GameState, move: import("../../..").Move) => import("../../..").GameState; readOutcome: (state: import("../../..").GameState) => import("../../..").Result | null; resignGame: (state: import("../../..").GameState, color: import("../../..").Color) => import("../../..").GameState; startGame: (setup: import("../../..").ChoiceCoinSetup, randomTurn?: import("../../..").Color) => import("../../..").GameState; stateSignature: (state: import("../../..").GameState) => string; }>`
  - returns: `Readonly<{ createChoiceCoinSetup: (template: import("../../..").Template) => import("../../..").ChoiceCoinSetup; createFreeChoiceCoinPreset: () => import("../../..").Template; lockChoiceCoins: (setup: import("../../..").ChoiceCoinSetup, color: import("../../..").Color, choices: Readonly<Record<string, import("../../..").PieceKind>>) => import("../../..").ChoiceCoinSetup; createPresets: () => readonly import("../../..").Template[]; getCheckedKingPositions: (board: import("../../..").Board) => readonly import("../../..").Position[]; getLegalMoves: (state: import("../../..").GameState, origin?: import("../../..").Position) => readonly import("../../..").Move[]; isKingInCheck: (board: import("../../..").Board, color: import("../../..").Color) => boolean; playMove: (state: import("../../..").GameState, move: import("../../..").Move) => import("../../..").GameState; readOutcome: (state: import("../../..").GameState) => import("../../..").Result | null; resignGame: (state: import("../../..").GameState, color: import("../../..").Color) => import("../../..").GameState; startGame: (setup: import("../../..").ChoiceCoinSetup, randomTurn?: import("../../..").Color) => import("../../..").GameState; stateSignature: (state: import("../../..").GameState) => string; }>`

## GameState

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:35:1`

An immutable playable position.

## Move

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:26:1`

A legal move including optional promotion or castle metadata.

## Piece

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:6:1`

A fixed board piece.

## PieceKind

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:4:1`

A chess piece kind.

## Position

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:12:1`

A zero-indexed board position.

## Result

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:47:1`

An automatic terminal game result.

## Template

Kind: `unknown`
Module: `src/types/chess.ts`
Source: `src/types/chess.ts:14:1`

A configurable starting position.
