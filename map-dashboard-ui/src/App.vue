<template>
  <!-- Vuetify app root wrapper -->
  <v-app>
    <!-- Navigation bar wrapper -->
    <v-container
      class="d-flex align-center"
      style="height: 72px; background-color: #FFFFFF"
      fluid
    >
      <!-- Logo Section -->
      <v-col
        :cols="$vuetify.display.mdAndUp ? 6 : 10"
        class="d-flex align-center"
      >
        <v-img
          src="@/assets/logo.svg"
          alt="PE Logo"
          :height="$vuetify.display.mdAndUp ? '36' : '48'"
          contain
        />
      </v-col>

      <!-- Desktop Menu Links -->
      <v-col
        v-if="$vuetify.display.mdAndUp"
        cols="6"
        class="d-flex justify-end align-center"
      >
        <v-btn text>Home</v-btn>
        <v-btn text>About</v-btn>
        <v-btn text>Contact</v-btn>
      </v-col>

      <!-- Mobile Hamburger Icon -->
      <v-col
        v-else
        cols="2"
        class="d-flex justify-end align-center"
      >
        <v-btn
          icon
          size="36"
          style="color: #33691E"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>
    </v-container>

    <!-- Main content section -->
    <v-main>
      <v-container class="pa-10">
        <v-alert type="success" title="Vuetify 3 Installed!">
          Welcome to the Map Dashboard UI!
        </v-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// No logic needed for now
</script>

