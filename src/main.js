import { ref, createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import config from './main.config.json'

const title = ref(config.Title);

const app = createApp(App);

for (const i in ElementPlusIconsVue) {
  app.component(i, ElementPlusIconsVue[i])
}

document.title = title.value;
app.use(ElementPlus);
app.mount('#app');