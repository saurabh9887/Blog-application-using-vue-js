// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import { createPinia } from "pinia";

// const app = createApp(App);
// app.use(createPinia());
// app.use(router);
// app.mount("#app");

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./Stores/userStore"; // Adjust the path as needed

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Initialize the user store
const userStore = useUserStore();
userStore.loadUserInfo();

app.mount("#app");
