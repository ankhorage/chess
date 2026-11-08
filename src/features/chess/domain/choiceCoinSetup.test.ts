import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createPresets } from '../../templates/domain/createPresets';
import { createChoiceCoinSetup, lockChoiceCoins } from './choiceCoinSetup';
import { startGame } from './startGame';

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
  const game = startGame(setup);
  assert.equal(game.board[12]?.[1]?.kind, 'B');
  assert.equal(game.board[0]?.[1]?.kind, 'N');
});

void test('Choice Coin setups cannot start before both players lock their complete selections', () => {
  const [, template] = createPresets();
  const setup = createChoiceCoinSetup(template);
  assert.throws(() => startGame(setup), /complete locked/);
  const whiteLocked = lockChoiceCoins(setup, 'w', {
    '1:12': 'B',
    '2:12': 'N',
    '3:12': 'B',
    '6:12': 'N',
    '7:12': 'B',
    '8:12': 'N',
  });
  assert.throws(() => startGame(whiteLocked), /complete locked/);
});

void test('coin-free templates start deterministically without player locks', () => {
  const [standard] = createPresets();
  const game = startGame(createChoiceCoinSetup(standard));
  assert.equal(game.turn, 'w');
  assert.equal(game.board[7]?.[4]?.kind, 'K');
});

void test('N/B Choice Coins reject options outside their preset', () => {
  const [, template] = createPresets();
  assert.throws(
    () =>
      lockChoiceCoins(createChoiceCoinSetup(template), 'w', {
        '1:12': 'P',
        '2:12': 'N',
        '3:12': 'B',
        '6:12': 'N',
        '7:12': 'B',
        '8:12': 'N',
      }),
    /invalid/,
  );
});
