const typography = {
	fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
	h1: {
		fontFamily: '"Fraunces", Georgia, serif',
		fontWeight: 600,
		fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
		lineHeight: 1.12,
		letterSpacing: '-0.24px',
	},
	h2: {
		fontFamily: '"Fraunces", Georgia, serif',
		fontWeight: 600,
		fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
		lineHeight: 1.18,
		letterSpacing: '-0.24px',
	},
	h3: {
		fontFamily: '"Fraunces", Georgia, serif',
		fontWeight: 600,
		fontSize: 'clamp(1.35rem, 2vw, 1.75rem)',
		letterSpacing: '-0.06px',
	},
	h4: {
		fontWeight: 500,
		fontSize: 20,
		letterSpacing: '-0.06px',
	},
	h5: {
		fontWeight: 500,
		fontSize: 16,
		letterSpacing: '-0.05px',
	},
	h6: {
		fontWeight: 500,
		fontSize: 14,
		letterSpacing: '-0.05px',
	},
	overline: {
		fontWeight: 700,
		fontSize: 12,
		letterSpacing: '0.1em',
		textTransform: 'uppercase' as const,
	},
};

export default typography;
