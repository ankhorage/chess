import { expect, test } from 'bun:test';

import * as chess from '../src/index.js';

test('exposes an empty package root before the engine feature is introduced', () => {
  expect(chess).toEqual({});
});
