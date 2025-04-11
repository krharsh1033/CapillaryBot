const tailwindcss = require('@tailwindcss/postcss');

module.exports = {
  style: {
    postcss: {
      plugins: [tailwindcss, require('autoprefixer')],
    },
  },
};

