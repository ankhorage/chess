/*** @title Configurable Chess
 * @readme A framework-independent, headless rules engine for configurable chess boards.
 */
export { createChessEngine } from './features/chess/domain/createChessEngine';
export type {
  Board,
  Castling,
  Cell,
  ChessEngine,
  ChoiceCoin,
  ChoiceCoinSetup,
  Color,
  GameState,
  Move,
  Piece,
  PieceKind,
  Position,
  Result,
  Template,
} from './types/chess';
