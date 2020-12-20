/**
 * Create react app doesn't support modifying postcss natively. Tailwind recommended this.
 */
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
