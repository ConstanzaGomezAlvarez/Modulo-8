import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.min.css' // Importar Bootstrap Icons con la ruta correcta
import './assets/css/stylesconbootstrap.css' // Importar el CSS personalizado de Bootstrap desde src/assets
import './assets/css/style.css' // Importar el CSS de estilos generales desde src/assets

const app = createApp(App)

app.use(router)

app.mount('#app')
