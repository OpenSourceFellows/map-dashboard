import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Globe, Moon, Sun } from 'lucide-react';
import { ColorModeContext } from '@/main.tsx'; // import the context

/**
 * Header component with the application logo, title, and dark mode toggle
 * @component
 * @returns {JSX.Element} The application header with ProgramEarth branding and dark mode toggle
 */
export const Header: React.FC = () => {
  const { toggleColorMode } = useContext(ColorModeContext); // get toggle function from context
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Toggle dark mode using context
  const handleToggle = () => {
    toggleColorMode(); // call context to switch mode
    setIsDarkMode((prev) => !prev); // update local state for button label & icon only
  };

  return (
    <Box component="header" className="header" role="banner"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--row-1)',
        padding: 'var(--col-1) var(--row-2)',
      }}
    >
      <Box component="a" href="/" className="header-logo" aria-label="ProgramEarth"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--col-gutter)',
        }}
      >
        <Box className="logo-icon"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Globe size={18} aria-hidden="true" />
        </Box>
        <h2 aria-hidden="true">ProgramEarth</h2>
      </Box>

      <Box className="light-dark-container"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--row-1)',
          ml: 'auto',
        }}
      >
        <Box className="light-dark-controller"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--row-gutter)',
          }}
        >
          <Typography component="span" className="mode-label">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </Typography>

          <IconButton
            id="theme-toggle"
            className={`toggle-box ${isDarkMode ? 'toggle-box--active' : ''}`}
            onClick={handleToggle}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            role="switch"
            aria-checked={isDarkMode}
            disableRipple
            sx={{
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <Box className="toggle__slider"
              sx={{
                top: '2px',
                left: '2px',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box className="toggle__icon">
               {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </Box>
            </Box>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
