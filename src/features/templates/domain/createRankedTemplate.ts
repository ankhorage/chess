import type { Cell, Color, PieceKind, Template } from '../../../types/chess';

/*** Create symmetrical home ranks with fixed pawns and configurable Choice Coin options. */
export function createRankedTemplate(
  id: string,
  name: string,
  width: number,
  height: number,
  back: readonly ('C' | PieceKind)[],
  choiceOptions: readonly PieceKind[] = ['N', 'B'],
): Template {
  const cells: Cell[][] = Array.from({ length: height }, () => Array<Cell>(width).fill(null));
  for (const color of ['w', 'b'] as const) {
    const home = color === 'w' ? height - 1 : 0;
    const pawn = color === 'w' ? height - 2 : 1;
    for (let x = 0; x < width; x++) {
      cells[home]![x] =
        back[x] === 'C'
          ? { color, kind: 'coin', options: choiceOptions }
          : { color, kind: back[x] as PieceKind };
      cells[pawn]![x] = { color, kind: 'P' };
    }
  }
  return { id, name, width, height, turn: 'w', cells };
}
