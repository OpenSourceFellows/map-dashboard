<template>
  <v-app>

    <!------------ Nav Bar --------------->
    <v-toolbar>
      Nav bar goes here
    </v-toolbar> <!-- /end Nav Bar-->

    <!-- Main Content -->
    <v-main>

      <!-- Grid layout -->
      <v-container>
        <v-row>

          <!--------- Map Visualization -------->
          <v-col cols="12" md="8" style="border: 1px solid black;" class="map-vis-col pa-0">
            <v-sheet>
              <!-- Test image just as a placeholder -->
               <v-img
                  cover
                  src="/images/Map_Screenshot_Vue_Test.jpg">
                </v-img>
            </v-sheet>
          </v-col> <!-- /end Map Visualization -->

          <!-------------- Map Information -------------->
          <v-col cols="12" md="4" class="map-info-col">

            <v-sheet class="map-info-reset"> 

              <!-- Title -->
              <h1 class="text-h1 mb-6">Biodiversity Conservation</h1>

              <!-- Maps section -->
              <v-container class="pa-0 mb-6">
                <h2 class="text-h2 mb-4">Maps</h2>
                <p class="text-body-1">Select to view map layer:</p>
                <!-- Checkboxes to select map layers -->
                <v-checkbox label="ProgramEarth Conservation Partners" density="compact" hide-details></v-checkbox>
                <v-checkbox label="USGS Watershed Boundary Dataset" density="compact" hide-details></v-checkbox>
                <v-checkbox label="Meta's Canopy Heights" density="compact" hide-details></v-checkbox>                
              </v-container> <!--/end maps section-->
              
              <!-- Legend -->
              <v-container class="pa-0 mb-6">
                <h2 class="text-h2 mb-4">Legend</h2>

                <!-- Points -->
                <div class="points-container">
                  <h3 class="text-h3 mb-3">Points</h3>
                  <!-- Landmark -->
                  <v-container class="points-item mb-3">
                    <i class="fas fa-circle" style="color: #424242; font-size: 16px;"></i> <p class="text-body-1">Landmark</p> <!-- /end Landmark -->
                  </v-container>
                  <!-- Animals -->
                  <v-container class="points-item mb-3">
                    <i class="fas fa-dove" style="color: #2196F3; font-size: 16px"></i> <p class="text-body-1">Animals</p>
                  </v-container> <!-- /end Animals -->
                  <!-- Plants -->
                  <v-container class="points-item">
                    <i class="fas fa-seedling" style="color: #43A047; font-size: 16px;"></i> <p class="text-body-1">Plants</p> <!-- /end plants -->
                  </v-container> 
                </div> <!-- /end points -->

                <!-- Areas -->
                <div class="areas-container">
                  <h3 class="text-h3 mb-3">Areas</h3> 
                  <!-- Species -->
                  <v-container class="areas-item mb-3" style="width: fit-content;">
                    <v-img
                      :width="30"
                      :height="30"
                      src="/images/species_icon.svg"
                    ></v-img>
                    <p class="text-body-1">Species</p>
                  </v-container> <!-- /end species -->
                  <!-- Water -->
                  <v-container class="areas-item mb-3" style="width: fit-content;">
                    <v-img
                      :width="30"
                      :height="30"
                      src="/images/water_polygon_icon.svg"
                    ></v-img>
                    <p class="text-body-1">Water</p>
                  </v-container> <!-- /end water -->
                  <!-- Canopy -->
                  <v-container class="areas-item" style="width: fit-content;">
                    <v-img
                      :width="30"
                      :height="30"
                      src="/images/canopy_polygon_icon.svg"
                    ></v-img>
                    <p class="text-body-1">Canopy</p>
                  </v-container> <!-- /end canopy -->
                </div> <!-- /end Areas -->
                
              </v-container> <!-- /end Legend -->

            </v-sheet> 

          </v-col> <!-- /end Map Information -->

        </v-row>
      </v-container> <!-- /end grid layout -->

    </v-main>

    <!---------------- Footer ------------------->
    <v-footer>
      Footer goes here
    </v-footer>

  </v-app>
</template>

<script setup>
// Nothing yet
</script>

