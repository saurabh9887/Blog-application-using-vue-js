<script setup>
import { ref } from "vue";
import Navbar from "./Components/Navbar/Navbar.vue";
import { useUserStore } from "./Stores/userStore";

const userStore = useUserStore();
const userInfo = userStore.userInfo;
</script>

<template>
  <div class="app">
    <Navbar v-if="userInfo" />
    <router-view></router-view>
  </div>
</template>
