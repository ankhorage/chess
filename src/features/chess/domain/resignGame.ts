import type { Color, GameState } from '../../../types/chess';

/*** Record a voluntary resignation as an immutable terminal game state. */
export function resignGame(state: GameState, color: Color): GameState {
  if (state.resigned) throw new Error('Game is already over');
  return { ...state, resigned: color };
}
