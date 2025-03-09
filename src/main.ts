import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./routes";
import App from "./app/app.vue";

import "normalize.css";

const pinia = createPinia();
const app = createApp(App).use(pinia).use(router);
app.mount("#app");

if (import.meta.env.MODE !== "production") app.config.performance = true;
