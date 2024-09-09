<script setup>
import { computed, ref } from "vue";
import "./ImgSlider.scss";

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});

const currentIndex = ref(0);

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};
</script>

<template>
  <div class="slider">
    <button @click="prevSlide" class="prev-button">&lt;</button>
    <div class="slider-images">
      <img
        :src="`http://localhost:3000/uploads/${props.images[currentIndex]}`"
        alt="Slide image"
      />
    </div>
    <button @click="nextSlide" class="next-button">&gt;</button>
  </div>
</template>
