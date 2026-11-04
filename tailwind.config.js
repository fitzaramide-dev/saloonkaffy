/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        glam: {
          page: '#FFF0F5',        /* Soft lavender blush / baby pink */
          pageLight: '#FDF2F4',   /* Ultra soft pastel */
          section: '#FCE4EC',     /* Sweet powder pink */
          border: '#F8BBD0',      /* Soft sweet pink border */
          borderLight: '#FCE4EC', /* Subtle border */
          pink: '#FF2A85',        /* Hot Barbie pink */
          pinkDark: '#E91E63',    /* Rich magenta pink for buttons & highlights */
          pinkDeep: '#D81B60',    /* Deep berry pink */
          plum: '#3B091E',        /* Deep velvet plum text */
          mocha: '#5C2236',       /* Secondary body text */
          muted: '#8E4B62',       /* Muted pink-charcoal text */
          card: '#FFFFFF'         /* Crisp white card */
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-jakarta)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
