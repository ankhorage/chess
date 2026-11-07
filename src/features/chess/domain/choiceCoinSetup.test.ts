import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createPresets } from '../../templates/domain/createPresets';
import { createChoiceCoinSetup, lockChoiceCoins } from './choiceCoinSetup';
import { createGameState } from './createGameState';

void test('Choice Coin selections lock independently before the engine creates a playable state', () => {
  const [, template] = createPresets();
  const white = {
    '1:12': 'B',
    '2:12': 'N',
    '3:12': 'B',
    '6:12': 'N',
    '7:12': 'B',
    '8:12': 'N',
  } as const;
  const black = { '1:0': 'N', '2:0': 'B', '3:0': 'N', '6:0': 'B', '7:0': 'N', '8:0': 'B' } as const;
  const whiteLocked = lockChoiceCoins(createChoiceCoinSetup(template), 'w', white);
  assert.throws(() => lockChoiceCoins(whiteLocked, 'w', white), /locked/);
  const setup = lockChoiceCoins(whiteLocked, 'b', black);
  const game = createGameState(setup);
  assert.equal(game.board[12]?.[1]?.kind, 'B');
  assert.equal(game.board[0]?.[1]?.kind, 'N');
});

void test('Choice Coin locks cannot be bypassed when creating a playable state', () => {
  const [, template] = createPresets();
  const setup = createChoiceCoinSetup(template);
  assert.throws(() => createGameState(setup), /locked/);
  const whiteLocked = lockChoiceCoins(setup, 'w', {
    '1:12': 'B',
    '2:12': 'N',
    '3:12': 'B',
    '6:12': 'N',
    '7:12': 'B',
    '8:12': 'N',
  });
  assert.throws(() => createGameState(whiteLocked), /locked/);
});
