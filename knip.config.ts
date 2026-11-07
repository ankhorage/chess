import { createKnipConfig } from '@ankhorage/devtools/knip';

export default createKnipConfig({
  entry: ['src/index.ts', 'paradox.config.ts', 'eslint.config.mjs', '.prettierrc.js'],
});
