<script setup>
import SingleNote from "../../Components/SingleNote/SingleNote.vue";
import File from "../../file.js";
import "./MyBlogs.scss";
</script>

<template>
  <div class="myBlogs">
    <h1>My Blogs</h1>
    <div class="myBlogWrapper">
      <SingleNote v-for="(x, index) in File" :key="index" :note="x" />
    </div>
  </div>
</template>
