import React from 'react';
import { Box } from '@mui/material';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
} from 'react-leaflet';
import { Layer } from './Layer'
// import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { FeatureCollection } from '@/types/geometry';

/**
 * Props for the MapContainer component
 * @interface MapContainerProps
 * @property {MapPoint[]} points - Array of map points to display (landmarks, animals, etc.)
 * @property {MapArea[]} areas - Array of map areas to display (zones, water bodies, etc.)
 */
interface MapContainerProps {
  layers: FeatureCollection[]
}

/**
 * The main map component that displays geographical data using react-leaflet
 * @component
 * @param {MapContainerProps} props - The properties that define the map's data
 * @returns {JSX.Element} A Leaflet map with markers and polygons
 */
export const MapContainer: React.FC<MapContainerProps> = ({
  layers
}) => {
  return (
    <Box className="map-wrapper"
      component="section"
      role="region"
      aria-label="Interactive map of geographical data"
      tabIndex={0}
      sx={{
        height: '100%',
        width: '100%', 
      }}
    >
      <LeafletMapContainer
        center={[-3.1319, -60.0261]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="map-container"
      >
      {/* OpenStreetMap base layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {layers.map((layer, idx) => (
        <Layer key={idx} featureCollection={layer} />
      ))}
      </LeafletMapContainer>
    </Box>
  );
};

/* Commented code preserved for reference:

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


// Creates a custom map marker icon based on the point type.
// @param {string} type - The type of point ('landmark', 'animal', 'insect', 'plant')
// @returns {Icon} A Leaflet Icon instance with custom styling
const createCustomIcon = (type: string): Icon => {
  const colors: Record<string, string> = {
    landmark: '#e74c3c',
    animal: '#3498db',
    insect: '#f39c12',
    plant: '#27ae60',
  };

  const color = colors[type] || colors.landmark;

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="${color}"/>
        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
};
*/
