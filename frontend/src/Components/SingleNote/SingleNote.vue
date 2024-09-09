<script setup>
import { computed } from "vue";
import "./SingleNote.scss";
import ImgSlider from "../ImgSlider/ImgSlider.vue";
const props = defineProps({
  note: {
    type: Object,
  },
});

const sliderImages = props.note.images;
const imageFilenames = sliderImages.map((path) => path.split("\\").pop());

const MAX_LENGTH = 200;
const truncatedDescription = computed(() => {
  if (!props.note.description) return "";

  return props.note.description.length > MAX_LENGTH
    ? props.note.description.substring(0, MAX_LENGTH) + "..."
    : props.note.description;
});
</script>

<template>
  <div class="single">
    <div class="singleWrapper">
      <div class="top">
        <span class="title"> Title: {{ note.title }} </span>
        <p>
          {{ truncatedDescription }}
          <!-- {{ note.description }} -->
        </p>
      </div>
      <div class="bottom">
        <ImgSlider :images="imageFilenames" />
        <!-- <img
          :src="`http://localhost:3000/uploads/${imageFilenames[0]}`"
          alt=""
        /> -->
      </div>
      <router-link to="/show" class="link">
        <button class="see">Read more</button>
      </router-link>
    </div>
  </div>
</template>
