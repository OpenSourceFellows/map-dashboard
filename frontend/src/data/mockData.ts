import type { MapPoint, MapArea, DataLayer } from '@/types/map';

/**
 * Mock data points representing various geographical features in the Manaus region
 * Used for development and testing purposes
 * @type {MapPoint[]}
 */
export const mockPoints: MapPoint[] = [
    {
        id: '1',
        lat: -3.1319,
        lng: -60.0261,
        type: 'landmark',
        name: 'Manaus City Center',
        description: 'Main urban area'
    },
    {
        id: '2',
        lat: -3.1190,
        lng: -59.9040,
        type: 'animal',
        name: 'Wildlife Observation Point',
        description: 'Common jaguar sightings'
    },
    {
        id: '3',
        lat: -3.0464,
        lng: -60.0277,
        type: 'plant',
        name: 'Rare Orchid Location',
        description: 'Endemic species habitat'
    },
    {
        id: '4',
        lat: -3.1590,
        lng: -59.9750,
        type: 'insect',
        name: 'Butterfly Research Site',
        description: 'High biodiversity area'
    }
];

/**
 * Mock area polygons representing different environmental zones
 * Used for development and testing purposes
 * @type {MapArea[]}
 */
export const mockAreas: MapArea[] = [
    {
        id: 'area-1',
        name: 'Protected Species Zone',
        type: 'species',
        coordinates: [
            [-3.0800, -60.0500],
            [-3.0800, -59.9500],
            [-3.1200, -59.9500],
            [-3.1200, -60.0500]
        ],
        color: '#FFD700',
        opacity: 0.3
    },
    {
        id: 'area-2',
        name: 'Water Conservation Area',
        type: 'water',
        coordinates: [
            [-3.1400, -60.0200],
            [-3.1400, -59.9800],
            [-3.1600, -59.9800],
            [-3.1600, -60.0200]
        ],
        color: '#4A90E2',
        opacity: 0.4
    }
];

/**
 * Mock layer configurations representing different data visualization options
 * Used for development and testing purposes
 * @type {DataLayer[]}
 */
export const mockLayers: DataLayer[] = [
    {
        id: 'species-layer',
        name: 'Species Data',
        description: 'Biodiversity and species distribution',
        visible: true,
        type: 'species'
    },
    {
        id: 'water-layer',
        name: 'Water Resources',
        description: 'Water bodies and conservation areas',
        visible: true,
        type: 'water'
    },
    {
        id: 'soil-layer',
        name: 'Soil Analysis',
        description: 'Soil composition and quality data',
        visible: false,
        type: 'soil'
    },
    {
        id: 'events-layer',
        name: 'Environmental Events',
        description: 'Recent environmental changes and events',
        visible: false,
        type: 'events'
    }
];