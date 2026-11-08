import type { ChoiceCoinSetup, Color, PieceKind } from '../../../types/chess';

/*** Check whether every Choice Coin has an allowed locked selection, or no coins exist. */
export function isChoiceCoinSetupReady(setup: ChoiceCoinSetup): boolean {
  /*** List the Choice Coins whose selections belong to one player. */
  const required = (color: Color) =>
    setup.template.cells.flatMap((row, y) =>
      row.flatMap((cell, x) =>
        cell?.kind === 'coin' && cell.color === color
          ? [{ key: `${x}:${y}`, options: cell.options }]
          : [],
      ),
    );
  const white = required('w');
  const black = required('b');
  if (white.length === 0 && black.length === 0) return true;
  return (
    setup.locked.w &&
    setup.locked.b &&
    hasExactSelections(setup.choices.w, white) &&
    hasExactSelections(setup.choices.b, black)
  );
}

/*** Match a selection set exactly to the Choice Coins owned by one player. */
function hasExactSelections(
  choices: Readonly<Record<string, PieceKind>>,
  required: readonly Readonly<{ key: string; options: readonly PieceKind[] }>[],
): boolean {
  return (
    Object.keys(choices).length === required.length &&
    required.every(({ key, options }) =>
      Object.entries(choices).some(
        ([selectedKey, selection]) => selectedKey === key && options.includes(selection),
      ),
    )
  );
}
