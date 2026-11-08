import type { GameState, Move } from '../../../types/chess';
import { applyUnchecked } from './applyUnchecked';
import { getLegalMoves } from './getLegalMoves';
import { stateSignature } from './stateSignature';

/*** Validate and execute one move, never trusting the client-provided destination or promotion. */
export function playMove(state: GameState, move: Move): GameState {
  if (state.resigned) throw new Error('Game is over');
  const accepted = getLegalMoves(state, move.from).find(
    (candidate) =>
      candidate.to.x === move.to.x &&
      candidate.to.y === move.to.y &&
      candidate.promotion === move.promotion,
  );
  if (!accepted) throw new Error('Illegal move');
  const next = applyUnchecked(state, accepted);
  return { ...next, history: [...state.history, stateSignature(next)] };
}
