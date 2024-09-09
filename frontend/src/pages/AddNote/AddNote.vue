<script setup>
import "./AddNote.scss";
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const form = reactive({
  title: "",
  description: "",
  images: [],
});

const router = useRouter();

const previewImages = ref([]);

const handleFileChange = (event) => {
  // form.images = event.target.files;
  // form.images = Array.from(event.target.files);

  previewImages.value = [];

  // Get the files from the input
  const files = event.target.files;

  // Create a preview for each file
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      previewImages.value.push(e.target.result);
    };

    reader.readAsDataURL(file);
  }

  // Update the images array for form submission
  form.images = files;
};

const removeImage = (index) => {
  previewImages.value.splice(index, 1);
  form.images = Array.from(form.images).filter((_, i) => i !== index);
};

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    // Append each file to formData
    for (let i = 0; i < form.images.length; i++) {
      formData.append("images", form.images[i]);
    }

    if (form.description.length < 200) {
      alert("Description should be atleast 200 letters!");
      return;
    }

    // Send the data to the server
    const response = await axios.post(
      "http://localhost:3000/api/note/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    router.push("/");
    console.log(response.data);
  } catch (error) {
    console.error("Error submitting the form:", error);
  }
};
</script>

<template>
  <div class="addNote">
    <h1>Give your thought a word</h1>
    <form @submit.prevent="handleSubmit">
      <div class="data">
        <label>Title:</label>
        <input type="text" placeholder="Enter title" v-model="form.title" />
      </div>
      <div class="data">
        <label>Add Description</label>
        <textarea
          placeholder="Enter your note here"
          v-model="form.description"
        ></textarea>
      </div>
      <div class="data">
        <label>Upload Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          @change="handleFileChange"
        />
      </div>
      <div class="imgPreview">
        <div
          class="imgWrapper"
          v-for="(img, index) in previewImages"
          :key="index"
        >
          <img :src="img" />
          <svg
            @click="removeImage(index)"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="{1.5}"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <button type="submit">Add Note</button>
    </form>
  </div>
</template>
