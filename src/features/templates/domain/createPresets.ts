import type { Cell, Template } from '../../../types/chess';
import { createFreeChoiceCoinPreset } from './createFreeChoiceCoinPreset';
import { createRankedTemplate } from './createRankedTemplate';

/*** Supply standard, Choice Coin, Free Choice Coin, and teaching endgame presets. */
export function createPresets(): readonly [Template, Template, Template, Template] {
  const standard = createRankedTemplate('standard', 'Klassisch 8 × 8', 8, 8, [
    'R',
    'N',
    'B',
    'Q',
    'K',
    'B',
    'N',
    'R',
  ]);
  const wide = createRankedTemplate('coins-10x13', 'Choice Coins 10 × 13', 10, 13, [
    'R',
    'C',
    'C',
    'C',
    'Q',
    'K',
    'C',
    'C',
    'C',
    'R',
  ]);
  const free = createFreeChoiceCoinPreset();
  const endgame: Cell[][] = Array.from({ length: 8 }, () => Array<Cell>(8).fill(null));
  endgame[0]![4] = { color: 'b', kind: 'K' };
  endgame[7]![4] = { color: 'w', kind: 'K' };
  endgame[7]![1] = { color: 'w', kind: 'N' };
  endgame[7]![2] = { color: 'w', kind: 'B' };
  return [
    standard,
    wide,
    free,
    {
      id: 'endgame',
      name: 'Matttraining K + B + N',
      width: 8,
      height: 8,
      turn: 'w',
      cells: endgame,
    },
  ];
}
