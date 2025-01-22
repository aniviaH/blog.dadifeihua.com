import type { Config } from "tailwindcss";

export default {
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
            h1: {
              fontSize: '2.25em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.2',
              fontWeight: '800',
              borderBottom: '1px solid var(--tw-prose-hr)',
              paddingBottom: '0.5em',
            },
            h2: {
              fontSize: '1.875em',
              marginTop: '1.75em',
              marginBottom: '0.8em',
              lineHeight: '1.3',
              fontWeight: '700',
              color: 'var(--tw-prose-headings)',
              '&::before': {
                content: '""',
                display: 'inline-block',
                width: '4px',
                height: '1em',
                backgroundColor: 'var(--tw-prose-links)',
                marginRight: '0.5em',
                verticalAlign: 'text-bottom',
              },
            },
            h3: {
              fontSize: '1.5em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.4',
              fontWeight: '600',
              color: 'var(--tw-prose-headings)',
              '&::before': {
                content: '"#"',
                marginRight: '0.5em',
                color: 'var(--tw-prose-links)',
                opacity: '0.5',
              },
            },
            h4: {
              fontSize: '1.25em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.5',
              fontWeight: '600',
              color: 'var(--tw-prose-headings)',
              fontStyle: 'italic',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
