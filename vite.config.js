const path = require('path');
const {defineConfig} = require('vitest/config');

module.exports = defineConfig({
  test: {},
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'BusinessEmail',
      fileName: (format) => `is-free-email.${format}.js`,
    },
  },
});
