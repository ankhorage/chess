import type { ChessEngine } from '../../../types/chess';
import { createPresets } from '../../templates/domain/createPresets';
import { createChoiceCoinSetup, lockChoiceCoins } from './choiceCoinSetup';
import { createGameState } from './createGameState';
import { getCheckedKingPositions } from './getCheckedKingPositions';
import { getLegalMoves } from './getLegalMoves';
import { isKingInCheck } from './isKingInCheck';
import { playMove } from './playMove';
import { readOutcome } from './readOutcome';
import { resignGame } from './resignGame';
import { stateSignature } from './stateSignature';

/*** Create the sole framework-independent boundary for configurable chess rules. */
export function createChessEngine(): ChessEngine {
  return {
    createChoiceCoinSetup,
    lockChoiceCoins,
    createGameState,
    createPresets,
    getCheckedKingPositions,
    getLegalMoves,
    isKingInCheck,
    playMove,
    readOutcome,
    resignGame,
    stateSignature,
  };
}
