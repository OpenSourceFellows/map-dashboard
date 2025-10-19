import { type JSX } from 'react'
import { GeoJSON } from 'react-leaflet'
import type { FeatureCollection } from '@/types/geometry'
// import type { Feature } from 'geojson'

interface LayerProps {
  featureCollection: FeatureCollection
}

/**
 * Returns a Leaflet <GeoJSON> component for each Feature in a FeatureCollection,
 * based on appropriate layer geometry type.
 *
 * @param {LayerProps} props - The component props.
 * @param {FeatureCollection} props.featureCollection - A GeoJSON FeatureCollection containing one or more features.
 * @returns {JSX.Element[]} An array of <GeoJSON> components, one per Feature in the collection.
 */
export function Layer({ featureCollection }: LayerProps): JSX.Element[] {
  return (
    featureCollection.features.map((feature, idx) => (
      <GeoJSON key={idx} data={feature} />
    ))
  )
}
