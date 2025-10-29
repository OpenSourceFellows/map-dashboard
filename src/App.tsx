import { useEffect, useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { MapContainer } from '@/components/Map/MapContainer';
import { MapLegend } from '@/components/Map/MapLegend';
import { LayerControls } from '@/components/Map/LayerControls';
import '@/styles/globals.css';
import '@/styles/map.css';
import { FixtureReader } from './data/fixture-reader';
import type { LayerVisibilityMap } from './types/map';
import type { FeatureCollection } from './types/geometry';

/**
 * Main application component that composes the entire UI
 * Manages the map state and renders the map with its controls
 * @component
 * @returns {JSX.Element} The complete application layout with header and map interface
 */
function App() {
  const [layers, setLayers] = useState<FeatureCollection[]>([])
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibilityMap>({})

  useEffect(() => {
    FixtureReader.collections()
      .then(collections => {
        setLayers([...collections])

        // Take the name property of each collection and set it's initial visibility to true
        const layerNames = collections.map((fc) => fc.name )
        const visibilityMap = layerNames.reduce((map, name) => { map[name] = true; return map }, {} as LayerVisibilityMap)
        setLayerVisibility({...visibilityMap})
      },)
  }, [])

  const layersToRender = layers.filter((fc) => layerVisibility[fc.name])

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <MapContainer layers={layersToRender} />
        {/*<MapLegend />*/}
        <LayerControls
          visibilityMap={layerVisibility}
          onLayerChange={setLayerVisibility}
        />
      </main>
    </div>
  );
}

export default App;
