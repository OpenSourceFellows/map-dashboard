<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-container
      fluid
      class="d-flex align-center"
      style="height: 72px; background-color: #FFFFFF"
    >
      <!-- Logo -->
      <v-col :cols="$vuetify.display.mdAndUp ? 6 : 10" class="d-flex align-center">
        <v-img
          src="@/assets/logo.svg"
          alt="PE Logo"
          :height="$vuetify.display.mdAndUp ? 36 : 48"
          contain
        />
      </v-col>
      
      <!-- Desktop Menu -->
      <v-col
        v-if="$vuetify.display.mdAndUp"
        cols="6"
        class="d-flex justify-end align-center"
      >
        <v-btn text>Home</v-btn>
        <v-btn text>About</v-btn>
        <v-btn text>Contact</v-btn>
      </v-col>
      
      <!-- Mobile Hamburger -->
      <v-col v-else cols="2" class="d-flex justify-end align-center">
        <v-btn
          icon
          size="36"
          style="color: #33691E"
          @click="drawer = true"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>
    </v-container>

    <!-- Mobile Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      style="background-color: #fff"
    >
      <v-list>
        <v-list-item @click="drawer = false"><v-list-item-title>Home</v-list-item-title></v-list-item>
        <v-list-item @click="drawer = false"><v-list-item-title>About</v-list-item-title></v-list-item>
        <v-list-item @click="drawer = false"><v-list-item-title>Contact</v-list-item-title></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content & Map Layout -->
    <v-main>
      <v-container>
        <v-row>
          <!-- Map Visualization -->
          <v-col cols="12" md="8" class="map-vis-col pa-0" style="border: 1px solid black;">
            <v-sheet>
              <v-img cover src="/images/Map_Screenshot_Vue_Test.jpg" />
            </v-sheet>
          </v-col>
          
          <!-- Map Info -->
          <v-col cols="12" md="4" class="map-info-col">
            <v-sheet class="map-info-reset">
              <h1 class="text-h1 mb-6">Biodiversity Conservation</h1>

              <!-- Maps Section -->
              <v-container class="pa-0 mb-6">
                <h2 class="text-h2 mb-4">Maps</h2>
                <p>Select to view map layer:</p>
                <v-checkbox label="ProgramEarth Conservation Partners" density="compact" hide-details />
                <v-checkbox label="USGS Watershed Boundary Dataset" density="compact" hide-details />
                <v-checkbox label="Meta's Canopy Heights" density="compact" hide-details />
              </v-container>

              <!-- Legend -->
              <v-container class="pa-0 mb-6">
                <h2 class="text-h2 mb-4">Legend</h2>
                
                <div class="points-container">
                  <h3 class="text-h3 mb-3">Points</h3>
                  <v-container class="points-item mb-3">
                    <i class="fas fa-circle" style="color: #424242; font-size: 16px;"></i>
                    <p>Landmark</p>
                  </v-container>
                  <v-container class="points-item mb-3">
                    <i class="fas fa-dove" style="color: #2196F3; font-size: 16px;"></i>
                    <p>Animals</p>
                  </v-container>
                  <v-container class="points-item">
                    <i class="fas fa-seedling" style="color: #43A047; font-size: 16px;"></i>
                    <p>Plants</p>
                  </v-container>
                </div>

                <div class="areas-container">
                  <h3 class="text-h3 mb-3">Areas</h3>
                  <v-container class="areas-item mb-3" style="width: fit-content;">
                    <v-img width="30" height="30" src="/images/species_icon.svg" />
                    <p>Species</p>
                  </v-container>
                  <v-container class="areas-item mb-3" style="width: fit-content;">
                    <v-img width="30" height="30" src="/images/water_polygon_icon.svg" />
                    <p>Water</p>
                  </v-container>
                  <v-container class="areas-item" style="width: fit-content;">
                    <v-img width="30" height="30" src="/images/canopy_polygon_icon.svg" />
                    <p>Canopy</p>
                  </v-container>
                </div>
              </v-container>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer>
      Footer goes here
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>
