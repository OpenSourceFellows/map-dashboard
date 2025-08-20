import React from 'react';
import { Globe } from 'lucide-react';

/**
 * Header component with the application logo and title
 * @component
 * @returns {JSX.Element} The application header with ProgramEarth branding
 */
export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-logo">
        <div className="logo-icon">
          <Globe size={18} />
        </div>
        <span>ProgramEarth</span>
      </div>
    </header>
  );
};
