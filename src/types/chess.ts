/*** A chess side. */
export type Color = 'w' | 'b';
/*** A chess piece kind. */
export type PieceKind = 'P' | 'N' | 'B' | 'R' | 'Q' | 'K';
/*** A fixed board piece. */
export type Piece = Readonly<{ kind: PieceKind; color: Color }>;
/*** A Choice Coin that resolves before normal play. */
export type ChoiceCoin = Readonly<{ kind: 'coin'; color: Color; options: readonly PieceKind[] }>;
/*** A serializable starting-board cell. */
export type Cell = Piece | ChoiceCoin | null;
/*** A zero-indexed board position. */
export type Position = Readonly<{ x: number; y: number }>;
/*** A configurable starting position. */
export type Template = Readonly<{
  id: string;
  name: string;
  width: number;
  height: number;
  turn: Color | 'random';
  cells: readonly (readonly Cell[])[];
}>;
type Rights = Readonly<{ K: boolean; Q: boolean }>;
/*** Per-color castling rights. */
export type Castling = Readonly<{ w: Rights; b: Rights }>;
/*** A legal move including optional promotion or castle metadata. */
export type Move = Readonly<{
  from: Position;
  to: Position;
  promotion?: 'N' | 'B' | 'R' | 'Q';
  castle?: 'K' | 'Q';
}>;
/*** A rectangular board containing fixed pieces. */
export type Board = readonly (readonly (Piece | null)[])[];
/*** An immutable playable position. */
export type GameState = Readonly<{
  board: Board;
  width: number;
  height: number;
  turn: Color;
  castling: Castling;
  enPassant: Position | null;
  halfmove: number;
  history: readonly string[];
  resigned: Color | null;
}>;
/*** An automatic terminal game result. */
export type Result = Readonly<{
  winner: Color | null;
  reason:
    | 'checkmate'
    | 'stalemate'
    | 'fifty-moves'
    | 'threefold'
    | 'insufficient-material'
    | 'resignation';
}>;
/*** A server-persistable Choice Coin setup with immutable locks per player. */
export type ChoiceCoinSetup = Readonly<{
  template: Template;
  choices: Readonly<Record<Color, Readonly<Record<string, PieceKind>>>>;
  locked: Readonly<Record<Color, boolean>>;
}>;
/*** The canonical public API of the headless rules engine. */
export type ChessEngine = Readonly<{
  createChoiceCoinSetup: (template: Template) => ChoiceCoinSetup;
  lockChoiceCoins: (
    setup: ChoiceCoinSetup,
    color: Color,
    choices: Readonly<Record<string, PieceKind>>,
  ) => ChoiceCoinSetup;
  createGameState: (
    template: Template,
    choices: Readonly<Record<Color, Readonly<Record<string, PieceKind>>>>,
    randomTurn?: Color,
  ) => GameState;
  createPresets: () => readonly Template[];
  getCheckedKingPositions: (board: Board) => readonly Position[];
  getLegalMoves: (state: GameState, origin?: Position) => readonly Move[];
  isKingInCheck: (board: Board, color: Color) => boolean;
  playMove: (state: GameState, move: Move) => GameState;
  readOutcome: (state: GameState) => Result | null;
  resignGame: (state: GameState, color: Color) => GameState;
  stateSignature: (state: GameState) => string;
}>;
