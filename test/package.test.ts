import { expect, test } from 'bun:test';

import * as chess from '../src/index.js';

test('exposes the canonical configurable chess engine', () => {
  expect(chess.createChessEngine).toBeTypeOf('function');
});
