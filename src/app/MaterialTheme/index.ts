import { createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
	palette: {
		type: 'light',
		background: {
			default: '#f7f1e8',
			paper: '#fffcf7',
		},
		primary: {
			contrastText: '#fffbf5',
			main: '#2c1b12',
		},
		secondary: {
			contrastText: '#2c1b12',
			main: '#c99a5b',
		},
		text: {
			primary: '#2c1b12',
			secondary: '#75685e',
			dark: common.black,
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: { background: '#f6eee4', height: '100%', minHeight: '100%' },
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: '#fffbf5',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: { borderRadius: 12, boxShadow: 'none', fontWeight: 700, textTransform: 'none' },
				contained: { '&:hover': { boxShadow: '0 6px 16px rgba(44, 27, 18, 0.16)' } },
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: { borderRadius: 12, backgroundColor: '#fffcf7', '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#b85d43', borderWidth: 2 } },
			},
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					borderRadius: 14,
					boxShadow: '0 18px 44px rgba(44, 27, 18, 0.18)',
				},
			},
		},
	},
	shadow,
	typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: {
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

export default theme;
