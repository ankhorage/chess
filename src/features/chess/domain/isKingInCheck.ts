import type { Board, Color } from '../../../types/chess';
import { isSquareAttacked } from './isSquareAttacked';

/*** A missing king cannot be checked; multiple configured kings must all be safe. */
export function isKingInCheck(board: Board, color: Color): boolean {
  return board.some((row, y) =>
    row.some(
      (piece, x) =>
        piece?.kind === 'K' &&
        piece.color === color &&
        isSquareAttacked(board, { x, y }, color === 'w' ? 'b' : 'w'),
    ),
  );
}
