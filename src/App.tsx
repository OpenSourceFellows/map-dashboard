import { useEffect, useState, type JSX } from 'react';
import { Header } from '@/components/Layout/Header';
import { MapContainer } from '@/components/Map/MapContainer';
import { LayerControls } from '@/components/Map/LayerControls';
import { Box } from '@mui/material';
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
function App(): JSX.Element {
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
    <Box 
      className="app-container"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        margin: 'var(--app-margin)',
        overflow: 'hidden',
      }}
    >
      <Header />
      <Box 
        component="main"
        className="main-content"
        sx={{
          flex: 1, 
          position: 'relative', 
          overflow: 'hidden',
        }}
      >
        <MapContainer layers={layersToRender} />
        {/*<MapLegend />*/}
        <LayerControls
          visibilityMap={layerVisibility}
          onLayerChange={setLayerVisibility}
        />
      </Box>
    </Box>
  );
}

export default App;
