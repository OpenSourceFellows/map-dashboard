import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import { ColorModeContext } from '@/contexts/ColorModeContext';
import '@/styles/globals.css';

// 1️⃣ Use ColorModeContext for light/dark mode state

// Helper to read CSS variable
function getCSSVariable(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Helper with fallback
function getCSSVariableOrFallback(name: string, fallback: string) {
  const value = getCSSVariable(name);
  return value || fallback;
}

// 2️⃣ Define app modes, toggle control, and palette
export function Main() {
  type ThemeMode = 'light' | 'dark';

  // Initialize from localStorage synchronously to prevent flash
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('darkMode');
    const initial = (stored === 'dark' || stored === 'light') ? stored : 'light';
    document.documentElement.setAttribute('data-theme', initial);
    return initial;
  });

  // Toggle function for dark/light mode
  const toggleColorMode = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('darkMode', newMode);
      document.documentElement.setAttribute('data-theme', newMode);
      return newMode;
    });
  };

  // Memoize color mode context for performance
  const colorMode = useMemo(() => ({ toggleColorMode, mode }), [mode]);

  // Memoized MUI theme
  const theme = useMemo(() => {
    // Grab CSS variables dynamically from :root or [data-theme]
    const vars = [
      '--body-bg-default',
      '--color-primary',
      '--color-secondary',
      '--color-bg-default',
      '--color-bg-paper',
      '--color-text-primary',
      '--color-text-secondary',
    ];

    const FALLBACKS: Record<string, string> = {
      '--body-bg-default': '#f9f9f9',
      '--color-primary': '#667eea',
      '--color-secondary': '#764ba2',
      '--color-bg-default': '#f9f9f9',
      '--color-bg-paper': 'transparent',
      '--color-text-primary': '#2c3e50',
      '--color-text-secondary': '#5a6c7d',
    };

    const [primary, secondary, bgDefault, bgPaper, textPrimary, textSecondary] = vars.map(
      (v) => getCSSVariableOrFallback(v, FALLBACKS[v])
    );

    // Validate that critical variables are present
    if (!primary || !bgDefault || !textPrimary) {
      console.warn('Missing critical CSS variables, using fallbacks');
    }

    return createTheme({
      palette: {
        mode,
        primary: { main: primary },
        secondary: { main: secondary },
        background: {
          default: bgDefault,
          paper: bgPaper,
        },
        text: {
          primary: textPrimary,
          secondary: textSecondary,
        },
      },
    });
  }, [mode]);

  // 3️⃣ Wrap app in providers
  return (
    <React.StrictMode>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={(theme) => ({
              body: {
                background:
                  theme.palette.mode === 'light'
                    ? `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)`
                    : `linear-gradient(135deg, var(--body-bg-default) 0%, var(--body-bg-default) 100%)`,
                color: theme.palette.text.primary,
                transition: 'var(--app-transition)',
              },
              '.app-container': {
                background: theme.palette.background.paper,
                boxShadow:
                  theme.palette.mode === 'light'
                    ? 'var(--box-shadow-light)'
                    : 'var(--box-shadow-dark)',
                borderRadius: 'var(--border-radius)',
                overflow: 'hidden',
                transition: 'var(--app-transition)',
              },
            })}
          />
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
