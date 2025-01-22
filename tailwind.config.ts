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
            fontSize: '1rem',
            lineHeight: '1.75',
            p: {
              marginTop: '1.2em',
              marginBottom: '1.2em',
            },
            h1: {
              fontSize: '2em',
              marginTop: '1.5em',
              marginBottom: '0.8em',
              lineHeight: '1.2',
              fontWeight: '800',
              borderBottom: '1px solid var(--tw-prose-hr)',
              paddingBottom: '0.5em',
            },
            h2: {
              fontSize: '1.5em',
              marginTop: '1.4em',
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
              fontSize: '1.25em',
              marginTop: '1.3em',
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
              fontSize: '1.125em',
              marginTop: '1.2em',
              marginBottom: '0.5em',
              lineHeight: '1.5',
              fontWeight: '600',
              color: 'var(--tw-prose-headings)',
              fontStyle: 'italic',
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
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
