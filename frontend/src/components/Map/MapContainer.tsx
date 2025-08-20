import React from 'react';
import {
  MapContainer as LeafletMapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
} from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapPoint, MapArea } from '@/types/map';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/**
 * Props for the MapContainer component
 * @interface MapContainerProps
 * @property {MapPoint[]} points - Array of map points to display (landmarks, animals, etc.)
 * @property {MapArea[]} areas - Array of map areas to display (zones, water bodies, etc.)
 */
interface MapContainerProps {
  points: MapPoint[];
  areas: MapArea[];
}

/**
 * Creates a custom map marker icon based on the point type
 * @param {string} type - The type of point ('landmark', 'animal', 'insect', 'plant')
 * @returns {Icon} A Leaflet Icon instance with custom styling
 */
const createCustomIcon = (type: string) => {
  const colors = {
    landmark: '#e74c3c',
    animal: '#3498db',
    insect: '#f39c12',
    plant: '#27ae60',
  };

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 12.5 41 12.5 41S25 19.4 25 12.5C25 5.6 19.4 0 12.5 0Z" fill="${
          colors[type as keyof typeof colors] || '#e74c3c'
        }"/>
        <circle cx="12.5" cy="12.5" r="6" fill="white"/>
      </svg>
    `)}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
};

/**
 * The main map component that displays geographical data using react-leaflet
 * @component
 * @param {MapContainerProps} props - The properties that define the map's data
 * @returns {JSX.Element} A Leaflet map with markers and polygons
 */
export const MapContainer: React.FC<MapContainerProps> = ({
  points,
  areas,
}) => {
  return (
    <LeafletMapContainer
      center={[-3.1319, -60.0261]}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
    >
      {/* OpenStreetMap base layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render map areas as polygons */}
      {areas.map((area) => (
        <Polygon
          key={area.id}
          positions={area.coordinates}
          pathOptions={{
            color: area.color,
            fillColor: area.color,
            fillOpacity: area.opacity,
            weight: 2,
            opacity: 0.8,
          }}
        >
          {/* Popup appears when the polygon is clicked */}
          <Popup>
            <div>
              <h4>{area.name}</h4>
              <p>Type: {area.type}</p>
            </div>
          </Popup>
        </Polygon>
      ))}

      {/* Render map points as markers with custom icons */}
      {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.lat, point.lng]}
          icon={createCustomIcon(point.type)}
        >
          <Popup>
            <div>
              <h4>{point.name}</h4>
              <p>
                <strong>Type:</strong> {point.type}
              </p>
              {point.description && <p>{point.description}</p>}
            </div>
          </Popup>
        </Marker>
      ))}
    </LeafletMapContainer>
  );
};
