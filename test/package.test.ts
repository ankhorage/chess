import { expect, test } from 'bun:test';

import * as chess from '../src/index.js';

test('exposes the canonical configurable chess engine', () => {
  expect(chess.createChessEngine).toBeTypeOf('function');
  const engine = chess.createChessEngine();
  expect(engine.startGame).toBeTypeOf('function');
  expect(engine.createFreeChoiceCoinPreset).toBeTypeOf('function');
  expect('createGameState' in engine).toBe(false);
  expect(engine.createFreeChoiceCoinPreset().id).toBe('free-choice-10x13');
  const standard = engine.createPresets().find(({ id }) => id === 'standard');
  if (!standard) throw new Error('Standard preset is required');
  expect(engine.startGame(engine.createChoiceCoinSetup(standard)).turn).toBe('w');
});
