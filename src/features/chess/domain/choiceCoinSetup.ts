import type { ChoiceCoinSetup, Color, PieceKind, Template } from '../../../types/chess';

/*** Create a server-persistable choice setup before either player may make normal moves. */
export function createChoiceCoinSetup(template: Template): ChoiceCoinSetup {
  return { template, choices: { w: {}, b: {} }, locked: { w: false, b: false } };
}

/*** Validate and permanently lock exactly one player's complete Choice Coin selection. */
export function lockChoiceCoins(
  setup: ChoiceCoinSetup,
  color: Color,
  choices: Readonly<Record<string, PieceKind>>,
): ChoiceCoinSetup {
  if (color === 'w' ? setup.locked.w : setup.locked.b)
    throw new Error('Choice coins are already locked');
  const required = setup.template.cells.flatMap((row, y) =>
    row.flatMap((cell, x) =>
      cell?.kind === 'coin' && cell.color === color
        ? [{ key: `${x}:${y}`, options: cell.options }]
        : [],
    ),
  );
  if (
    Object.keys(choices).length !== required.length ||
    required.some(({ key, options }) => !isSelectedOption(choices, key, options))
  )
    throw new Error('Choice coin selection is invalid');
  return {
    ...setup,
    choices: { ...setup.choices, [color]: { ...choices } },
    locked: { ...setup.locked, [color]: true },
  };
}

/*** Match a submitted selection without trusting a dynamically indexed object key. */
function isSelectedOption(
  choices: Readonly<Record<string, PieceKind>>,
  key: string,
  options: readonly PieceKind[],
): boolean {
  return Object.entries(choices).some(
    ([selectedKey, selection]) => selectedKey === key && options.includes(selection),
  );
}
