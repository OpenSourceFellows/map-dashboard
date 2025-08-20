// main.js
import { createApp } from 'vue'
import App from './App.vue'

// Vuetify core
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
// Register global components, plugins, etc. here if needed

//import css style sheet
import './style.css'