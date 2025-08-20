/**
 * Represents a geographic point on the map with associated metadata
 * @interface MapPoint
 * @property {string} id - Unique identifier for the point
 * @property {number} lat - Latitude coordinate
 * @property {number} lng - Longitude coordinate
 * @property {'landmark' | 'animal' | 'insect' | 'plant'} type - Category of the point
 * @property {string} name - Display name of the point
 * @property {string} [description] - Optional detailed description of the point
 */
export interface MapPoint {
    id: string;
    lat: number;
    lng: number;
    type: 'landmark' | 'animal' | 'insect' | 'plant';
    name: string;
    description?: string;
}

/**
 * Represents a geographic area/polygon on the map
 * @interface MapArea
 * @property {string} id - Unique identifier for the area
 * @property {string} name - Display name of the area
 * @property {'species' | 'water' | 'soil'} type - Category of the area
 * @property {[number, number][]} coordinates - Array of lat-lng coordinate pairs defining the polygon
 * @property {string} color - CSS color value for the area
 * @property {number} opacity - Opacity value between 0 and 1
 */
export interface MapArea {
    id: string;
    name: string;
    type: 'species' | 'water' | 'soil';
    coordinates: [number, number][];
    color: string;
    opacity: number;
}

/**
 * Represents a toggleable data layer on the map
 * @interface DataLayer
 * @property {string} id - Unique identifier for the layer
 * @property {string} name - Display name of the layer
 * @property {string} description - Detailed description of what the layer represents
 * @property {boolean} visible - Whether the layer is currently visible on the map
 * @property {'species' | 'water' | 'soil' | 'events'} type - Category of data the layer represents
 */
export interface DataLayer {
    id: string;
    name: string;
    description: string;
    visible: boolean;
    type: 'species' | 'water' | 'soil' | 'events';
}

/**
 * Represents the complete state of the map
 * @interface MapState
 * @property {[number, number]} center - Initial center coordinates of the map [lat, lng]
 * @property {number} zoom - Initial zoom level of the map
 * @property {MapPoint[]} points - Array of all map points (landmarks, animals, etc.)
 * @property {MapArea[]} areas - Array of all map areas (species zones, water bodies, etc.)
 * @property {DataLayer[]} layers - Array of all toggleable data layers
 */
export interface MapState {
    center: [number, number];
    zoom: number;
    points: MapPoint[];
    areas: MapArea[];
    layers: DataLayer[];
}