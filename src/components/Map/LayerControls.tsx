import React from 'react';
import { Box } from '@mui/material';
import { Checkbox } from '@mui/material';
import type { LayerVisibilityMap } from '@/types/map';

interface LayerControlsProps {
  visibilityMap: LayerVisibilityMap;
  onLayerChange: (visibilityMap: LayerVisibilityMap) => void;
}

/**
 * A control panel component for managing map layer visibility
 * @component
 * @param {LayerControlsProps} props - The component props
 * @returns {JSX.Element} A panel with layer toggle controls
 */
export const LayerControls: React.FC<LayerControlsProps> = ({
  visibilityMap,
  onLayerChange,
}) => {
  return (
    <Box
      component="section"
      className="layer-controls"
      aria-labelledby="layer-controls-title"
      role="region"
      sx={{
        position: 'absolute',
        top: 'var(--edge)',
        right: 'var(--edge)',
        padding: 'var(--padding)',
        minWidth: 'var(--controls-width)',
        zIndex: 'var(--zIndex)',
      }}
    >
      <h3 className="component-title space-row-1">
        Map Data Layers
      </h3>

      <ul role="group" aria-label="Map Data Layers">
        {Object.entries(visibilityMap as Record<string, boolean>).map(([layerName, isVisible]) => (
          <Box
            component="li"
            key={layerName} 
            className="layer-item"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: 'var(--row-gutter)',
              borderRadius: 'var(--row-gutter)',
              marginBottom: 'var(--row-gutter)',
            }}
          >
            <label>
              <Checkbox
                checked={isVisible}
                onChange={() =>
                  onLayerChange({ ...visibilityMap, [layerName]: !isVisible })
                }
                slotProps={{
                  input: {
                    'aria-label': layerName,
                    'aria-checked': isVisible,
                  },
                }}
              />
              <span>{layerName}</span>
            </label>
          </Box>
        ))}
      </ul>
    </Box>
  );
};

/* Commented code preserved for reference:

import { PawPrint, Droplets, Mountain, Calendar } from 'lucide-react';

// Map layer types to icons for UI representation
const layerIcons = {
  species: PawPrint,
  water: Droplets,
  soil: Mountain,
  events: Calendar,
};

// Render buttons for switching active layer types (with icons)
<div className="layer-icons">
  {Object.entries(layerIcons).map(([type, Icon]) => (
    <button
      key={type}
      className={`layer-icon-button ${
        activeLayerType === type ? 'active' : ''
      }`}
      onClick={() => onLayerTypeChange(type)}
    >
      <Icon size={20} />
      <span className="layer-icon-text">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    </button>
  ))}
</div>

Original checkbox structure (less accessible):
<div>
  {Object.entries(visibilityMap).map(([k, v], idx) => (
    <div key={idx} className="layer-item">
      <Checkbox
        id={idx.toString()}
        checked={v}
        onChange={() => onLayerChange({...visibilityMap, [k]: !v})}
      />
      <div className="layer-info">
        <div className="layer-name">{k}</div>
      </div>
    </div>
  ))}
</div>

*/
