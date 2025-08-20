import React from 'react';
import { PawPrint, Droplets, Mountain, Calendar } from 'lucide-react';
import type { DataLayer } from '@/types/map';
import { Checkbox } from '@/components/UI/CheckBox';

/**
 * Props for the LayerControls component
 * @interface LayerControlsProps
 * @property {DataLayer[]} layers - Array of available map layers
 * @property {string} activeLayerType - Currently selected layer type
 * @property {(layerId: string) => void} onLayerToggle - Callback when a layer's visibility is toggled
 * @property {(type: string) => void} onLayerTypeChange - Callback when the active layer type is changed
 */
interface LayerControlsProps {
  layers: DataLayer[];
  activeLayerType: string;
  onLayerToggle: (layerId: string) => void;
  onLayerTypeChange: (type: string) => void;
}

// Map layer types to icons for UI representation
const layerIcons = {
  species: PawPrint,
  water: Droplets,
  soil: Mountain,
  events: Calendar,
};

/**
 * A control panel component for managing map layer visibility
 * @component
 * @param {LayerControlsProps} props - The component props
 * @returns {JSX.Element} A panel with layer toggle controls and type selection buttons
 */
export const LayerControls: React.FC<LayerControlsProps> = ({
  layers,
  activeLayerType,
  onLayerToggle,
  onLayerTypeChange,
}) => {
  return (
    <div className="layer-controls">
      <h3 className="legend-title">Map Data Layers</h3>

      {/* Render buttons for switching active layer types (with icons) */}
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

      {/* Render checkboxes for each available layer */}
      <div>
        {layers.map((layer) => (
          <div key={layer.id} className="layer-item">
            <Checkbox
              id={layer.id}
              checked={layer.visible}
              onChange={() => onLayerToggle(layer.id)}
            />
            <div className="layer-info">
              <div className="layer-name">{layer.name}</div>
              <div className="layer-description">{layer.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
