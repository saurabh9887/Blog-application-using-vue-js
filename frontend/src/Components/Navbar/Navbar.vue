<script setup>
import "./Navbar.scss";
import { useUserStore } from "../../Stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const userInfo = userStore.userInfo;

const router = useRouter();

console.log(userInfo);
</script>

<template>
  <div class="navbar">
    <div class="navWrapper">
      <div class="left">
        <router-link to="/" class="link">
          <img src="../../../public/img/logoNotes.jpeg" />
        </router-link>
        <router-link to="/" class="link">
          <span>Blog App</span>
        </router-link>
      </div>
      <div class="right">
        <div class="links">
          <router-link to="/" class="link">
            <span>Home</span>
          </router-link>
          <router-link to="/add" class="link">
            <span>Add Blog</span>
          </router-link>
        </div>
        <div class="user">
          <router-link to="/edit/:id" class="link">
            <img
              @click="router.push(`/edit/${userInfo.id}`)"
              :src="`http://localhost:3000/uploads/${userInfo.img
                .split('\\')
                .pop()}`"
              alt="username"
            />
          </router-link>
          <router-link to="/edit/:id" class="link">
            <span @click="router.push(`/edit/${userInfo.id}`)">{{
              userInfo.username
            }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
