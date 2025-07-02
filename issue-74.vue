<template>
  <v-footer 
    color="white" 
    class="mt-8 mb-8"
  >
    <v-container fluid>
      <v-row>
        <!-- Desktop: 6 columns, right-aligned | Mobile: 12 columns, centered -->
        <v-col 
          cols="12" 
          md="6" 
          :class="$vuetify.display.mdAndUp ? 'text-right' : 'text-center'"
        >
          <p class="text-grey-darken-4 mb-0">
            This is a  
            <a 
              href="https://www.programearth.org" 
              target="_blank" 
              class="text-grey-darken-4 text-decoration-none"
            >
              www.programearth.org
            </a> project. Updated 2025.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
/* Additional styling if needed */
a:hover {
  text-decoration: underline !important;
}
</style>