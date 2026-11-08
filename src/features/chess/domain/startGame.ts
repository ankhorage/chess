import type {
  Board,
  Castling,
  ChoiceCoinSetup,
  Color,
  GameState,
  Piece,
} from '../../../types/chess';
import { isChoiceCoinSetupReady } from './isChoiceCoinSetupReady';
import { stateSignature } from './stateSignature';

/*** Start a playable game only from a complete Choice Coin setup. */
export function startGame(setup: ChoiceCoinSetup, randomTurn: Color = 'w'): GameState {
  if (!isChoiceCoinSetupReady(setup))
    throw new Error('Choice coin setup must contain complete locked selections');
  const { template, choices } = setup;
  const board: Board = template.cells.map((row, y) =>
    row.map((cell, x): Piece | null => {
      if (!cell) return null;
      if (cell.kind !== 'coin') return cell;
      const available = cell.color === 'w' ? choices.w : choices.b;
      const kind = Object.entries(available).find(([key]) => key === `${x}:${y}`)?.[1];
      if (!kind) throw new Error('Choice coin setup is incomplete');
      return { color: cell.color, kind };
    }),
  );
  /*** Derive initial castling rights from the resolved home rank. */
  const rights = (color: Color) => {
    const y = color === 'w' ? template.height - 1 : 0;
    const row = board.at(y) ?? [];
    const kingCount = row.filter((piece) => piece?.color === color && piece.kind === 'K').length;
    return {
      K:
        kingCount === 1 &&
        row.at(template.width - 1)?.color === color &&
        row.at(template.width - 1)?.kind === 'R',
      Q: kingCount === 1 && row.at(0)?.color === color && row.at(0)?.kind === 'R',
    };
  };
  const castling: Castling = { w: rights('w'), b: rights('b') };
  const state: GameState = {
    board,
    width: template.width,
    height: template.height,
    turn: template.turn === 'random' ? randomTurn : template.turn,
    castling,
    enPassant: null,
    halfmove: 0,
    history: [],
    resigned: null,
  };
  return { ...state, history: [stateSignature(state)] };
}
