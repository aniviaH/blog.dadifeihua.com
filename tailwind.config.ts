import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1rem',
            lineHeight: '1.75',
            p: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25em',
              fontSize: '0.875em',
            },
            h1: {
              fontSize: '1.875em',
              marginTop: '2em',
              marginBottom: '1em',
            },
            h2: {
              fontSize: '1.5em',
              marginTop: '1.75em',
              marginBottom: '0.75em',
            },
            h3: {
              fontSize: '1.25em',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            ul: {
              marginTop: '0.75em',
              marginBottom: '0.75em',
              paddingLeft: '1.25em',
            },
            li: {
              marginTop: '0.375em',
              marginBottom: '0.375em',
            },
            'ul > li': {
              paddingLeft: '0.375em',
            },
            '> ul > li p': {
              marginTop: '0.375em',
              marginBottom: '0.375em',
            },
            blockquote: {
              fontStyle: 'italic',
              fontSize: '0.875em',
              lineHeight: '1.6',
              marginTop: '1.5em',
              marginBottom: '1.5em',
              paddingLeft: '1em',
            },
          },
        },
        about: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
