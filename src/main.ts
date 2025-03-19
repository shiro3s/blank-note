import { createApp } from "vue";
import router from "./routes";
import App from "./app/app.vue";

import "normalize.css";

const app = createApp(App).use(router);
app.mount("#app");

if (import.meta.env.MODE !== "production") app.config.performance = true;
