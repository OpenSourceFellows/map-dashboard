// Given a Feature, it will return a Leaflet Component based on geometry type
import React from 'react'
import { GeoJSON } from 'react-leaflet'
import type { FeatureCollection } from '@/types/geometry'
import type { Feature } from 'geojson'

interface LayerProps {
  featureCollection: FeatureCollection
}

export const Layer: React.FC<LayerProps> = ({ featureCollection }) => {
  return (
    featureCollection.features.map((feature, idx) => (
      <GeoJSON
        key={`${featureCollection.name}-${feature.id || idx}`}
        data={feature}
      />
    ))
  )
}
