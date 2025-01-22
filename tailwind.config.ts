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
            fontSize: '0.9375rem',
            lineHeight: '1.6',
            maxWidth: '65ch',
            p: {
              marginTop: '0.8em',
              marginBottom: '0.8em',
            },
            '[class~="lead"]': {
              fontSize: '1.1em',
            },
            h1: {
              fontSize: '1.75em',
              marginTop: '1.2em',
              marginBottom: '0.6em',
              lineHeight: '1.2',
              fontWeight: '700',
              borderBottom: '1px solid var(--tw-prose-hr)',
              paddingBottom: '0.3em',
            },
            h2: {
              fontSize: '1.4em',
              marginTop: '1.2em',
              marginBottom: '0.6em',
              lineHeight: '1.3',
              fontWeight: '600',
              color: 'var(--tw-prose-headings)',
              '&::before': {
                content: '""',
                display: 'inline-block',
                width: '3px',
                height: '0.9em',
                backgroundColor: 'var(--tw-prose-links)',
                marginRight: '0.4em',
                verticalAlign: 'text-bottom',
              },
            },
            h3: {
              fontSize: '1.2em',
              marginTop: '1em',
              marginBottom: '0.5em',
              lineHeight: '1.4',
              fontWeight: '600',
              color: 'var(--tw-prose-headings)',
              '&::before': {
                content: '"#"',
                marginRight: '0.4em',
                color: 'var(--tw-prose-links)',
                opacity: '0.5',
              },
            },
            h4: {
              fontSize: '1.1em',
              marginTop: '1em',
              marginBottom: '0.4em',
              lineHeight: '1.4',
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
            ul: {
              marginTop: '0.8em',
              marginBottom: '0.8em',
              paddingLeft: '1.2em',
            },
            ol: {
              marginTop: '0.8em',
              marginBottom: '0.8em',
              paddingLeft: '1.2em',
            },
            li: {
              marginTop: '0.3em',
              marginBottom: '0.3em',
            },
            blockquote: {
              marginTop: '1em',
              marginBottom: '1em',
              paddingLeft: '1em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config;
