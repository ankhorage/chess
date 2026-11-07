import { defineParadoxConfig } from '@ankhorage/paradox';

export default defineParadoxConfig({
  mode: 'write',
  docs: {
    title: '@ankhorage/chess',
    description: 'Framework-independent, headless rules engine for configurable chess.',
  },
  package: {
    entrypoints: ['src/index.ts'],
  },
  output: {
    dir: 'paradox',
  },
});
