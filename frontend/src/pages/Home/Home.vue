<script setup>
import "./Home.scss";
import SingleNote from "../../Components/SingleNote/SingleNote.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useUserStore } from "../../Stores/userStore";

const blogs = ref([]);

const userStore = useUserStore();
const userInfo = userStore.userInfo;
console.log(userInfo);

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/note");
    blogs.value = res.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="home">
    <SingleNote v-for="(x, index) in blogs" :key="index" :note="x" />
  </div>
</template>
