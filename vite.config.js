import {defineConfig} from 'vitest/config';
import {resolve} from 'path';

export default defineConfig({
  test: {},
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/email.js'),
      name: 'IsFreeEmail',
      fileName: 'is-free-email',
    },
  },
});
