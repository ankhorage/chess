import type { ChessEngine } from '../../../types/chess';
import { createFreeChoiceCoinPreset } from '../../templates/domain/createFreeChoiceCoinPreset';
import { createPresets } from '../../templates/domain/createPresets';
import { createChoiceCoinSetup, lockChoiceCoins } from './choiceCoinSetup';
import { getCheckedKingPositions } from './getCheckedKingPositions';
import { getLegalMoves } from './getLegalMoves';
import { isKingInCheck } from './isKingInCheck';
import { playMove } from './playMove';
import { readOutcome } from './readOutcome';
import { resignGame } from './resignGame';
import { startGame } from './startGame';
import { stateSignature } from './stateSignature';

/*** Create the sole framework-independent boundary for configurable chess rules. */
export function createChessEngine(): ChessEngine {
  return {
    createChoiceCoinSetup,
    createFreeChoiceCoinPreset,
    lockChoiceCoins,
    createPresets,
    getCheckedKingPositions,
    getLegalMoves,
    isKingInCheck,
    playMove,
    readOutcome,
    resignGame,
    startGame,
    stateSignature,
  };
}
