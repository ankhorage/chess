import type { Template } from '../../../types/chess';
import { createRankedTemplate } from './createRankedTemplate';

/*** Create the named Free Choice Coin preset with every standard piece option. */
export function createFreeChoiceCoinPreset(): Template {
  return createRankedTemplate(
    'free-choice-10x13',
    'Free Choice Coins 10 × 13',
    10,
    13,
    ['R', 'C', 'C', 'C', 'Q', 'K', 'C', 'C', 'C', 'R'],
    ['P', 'N', 'B', 'R', 'Q', 'K'],
  );
}
