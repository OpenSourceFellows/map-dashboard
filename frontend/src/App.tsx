import { Header } from '@/components/Layout/Header';
import { MapContainer } from '@/components/Map/MapContainer';
import { MapLegend } from '@/components/Map/MapLegend';
import { LayerControls } from '@/components/Map/LayerControls';
import { useMapData } from '@/hooks/useMapData';
import '@/styles/globals.css';
import '@/styles/map.css';

/**
 * Main application component that composes the entire UI
 * Manages the map state and renders the map with its controls
 * @component
 * @returns {JSX.Element} The complete application layout with header and map interface
 */
function App() {
  const {
    points,
    areas,
    layers,
    activeLayerType,
    setActiveLayerType,
    toggleLayer,
  } = useMapData();

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <MapContainer points={points} areas={areas} />
        <MapLegend />
        <LayerControls
          layers={layers}
          activeLayerType={activeLayerType}
          onLayerToggle={toggleLayer}
          onLayerTypeChange={setActiveLayerType}
        />
      </main>
    </div>
  );
}

export default App;
