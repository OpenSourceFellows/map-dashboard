<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for Leaflet marker icons in webpack/vite
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

// Component props and state
const props = defineProps({
  landmarks: {
    type: Array,
    default: () => []
  }
})

const map = ref(null)
const mapContainer = ref(null)
const markers = ref([])
const selectedFilters = ref(['landmark', 'plant', 'animal'])

// Custom marker icons
const createIcon = (color) => {
  return L.divIcon({
    className: `custom-marker ${color}`,
    html: `<div style="background-color: ${color}"></div>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  })
}

const icons = {
  landmark: createIcon('black'),
  plant: createIcon('green'),
  animal: createIcon('blue')
}

// Initialize map
onMounted(() => {
  if (!mapContainer.value) return
  
  // Fix default icon issue
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: icon,
    shadowUrl: iconShadow
  })
  
  // Create map
  map.value = L.map(mapContainer.value).setView([37.7749, -122.4194], 10) // Default to SF
  
  // Add tile layer (OpenStreetMap)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map.value)
  
  // Add markers initially
  addMarkers()
})

// Add markers to map
const addMarkers = () => {
  if (!map.value) return
  
  // Clear existing markers
  markers.value.forEach(marker => map.value.removeLayer(marker))
  markers.value = []
  
  // Add filtered markers
  filteredLandmarks.value.forEach(landmark => {
    const type = getMarkerType(landmark)
    const marker = L.marker(
      [landmark.latitude, landmark.longitude], 
      { icon: icons[type] }
    )
    
    // Add popup with info
    marker.bindPopup(`
      <strong>${landmark.name || landmark.landmark}</strong><br>
      ${landmark.species ? `Species: ${landmark.species}<br>` : ''}
      ${landmark.campaign ? `Campaign: ${landmark.campaign}` : ''}
    `)
    
    marker.addTo(map.value)
    markers.value.push(marker)
  })
}

// Determine marker type based on species field
const getMarkerType = (item) => {
  if (!item.species) return 'landmark'
  
  // This logic can be refined based on your actual data
  const animalSpecies = ['Herring', 'Salmon', 'Rainbow Trout', 'Catfish', 'Mountain Lion', 'Duck', 'Eagle']
  return animalSpecies.includes(item.species) ? 'animal' : 'plant'
}

// Filtered landmarks based on selected types
const filteredLandmarks = computed(() => {
  return props.landmarks.filter(landmark => 
    selectedFilters.value.includes(getMarkerType(landmark))
  )
})

// Update markers when filters change
watch(selectedFilters, () => {
  addMarkers()
})

// Update markers when landmarks data changes
watch(() => props.landmarks, () => {
  addMarkers()
}, { deep: true })
</script>

<template>
  <div class="map-container">
    <!-- Filter controls -->
    <div class="filter-controls">
      <div class="filter-title">Filter Map Points:</div>
      <div class="filter-options">
        <label>
          <input type="checkbox" v-model="selectedFilters" value="landmark">
          <span class="marker-icon landmark"></span>
          Landmarks
        </label>
        <label>
          <input type="checkbox" v-model="selectedFilters" value="plant">
          <span class="marker-icon plant"></span>
          Plants
        </label>
        <label>
          <input type="checkbox" v-model="selectedFilters" value="animal">
          <span class="marker-icon animal"></span>
          Animals
        </label>
      </div>
    </div>
    
    <!-- Map container -->
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 600px;
}

.map {
  width: 100%;
  height: 100%;
}

.filter-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.4);
}

.filter-title {
  font-weight: bold;
  margin-bottom: 8px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-options label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.marker-icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.marker-icon.landmark {
  background-color: black;
}

.marker-icon.plant {
  background-color: green;
}

.marker-icon.animal {
  background-color: blue;
}

/* Custom marker styles */
:global(.custom-marker) {
  width: 25px !important;
  height: 41px !important;
}

:global(.custom-marker div) {
  width: 100%;
  height: 100%;
  mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"></path></svg>');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
</style>