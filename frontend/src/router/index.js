import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home/Home.vue";
import AddNote from "../pages/AddNote/AddNote.vue";
import ShowNote from "../pages/ShowNote/ShowNote.vue";
import SingleNote from "../Components/SingleNote/SingleNote.vue";
import UserSettings from "../pages/UserSettings/UserSettings.vue";
import MyBlogs from "../pages/MyBlogs/MyBlogs.vue";
import Register from "../pages/Register/Register.vue";
import Login from "../pages/Login/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/add", component: AddNote },
    { path: "/show", component: ShowNote },
    { path: "/single", component: SingleNote },
    { path: "/edit/:id", component: UserSettings },
    { path: "/myblogs", component: MyBlogs },
    { path: "/register", component: Register },
    { path: "/login", component: Login },
  ],
});

export default router;
