<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import "./Register.scss";
import { useRouter } from "vue-router";
import { useUserStore } from "../../Stores/userStore";

const form = reactive({
  username: "",
  email: "",
  password: "",
  img: null,
});

const router = useRouter();

const previewImage = ref(null);

const handleFileChange = (event) => {
  const file = event.target.files[0]; // Get the first file (single image)

  if (file) {
    // Check if the file is an image
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, GIF).");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      previewImage.value = e.target.result; // Show preview of the selected image
    };

    reader.onerror = (e) => {
      console.error("Error reading file:", e);
      alert("There was an error loading the image. Please try again.");
    };

    reader.readAsDataURL(file);
    form.img = file; // Store the selected image in form.img
  } else {
    // Clear the image if no file is selected
    previewImage.value = null;
    form.img = null;
  }
};

const userStore = useUserStore();

const handleSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("img", form.img);

    const res = await axios.post(
      "http://localhost:3000/api/auth/register",
      formData
    );

    userStore.setUserInfo({
      username: res.data.username,
      email: res.data.email,
      id: res.data._id,
      createdAt: res.data.createdAt,
      img: res.data.img || "",
    });

    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

console.log(form);
</script>

<template>
  <div class="register">
    <div class="registerWrapper">
      <h1>Register with us</h1>
      <form @submit.prevent="handleSubmit">
        <div class="data">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            v-model="form.username"
          />
        </div>
        <div class="data">
          <label>Email</label>
          <input type="email" placeholder="Enter Email" v-model="form.email" />
        </div>
        <div class="data">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            v-model="form.password"
          />
        </div>
        <div class="data">
          <div class="inputData">
            <div class="fileInput">
              <label>Enter Profile Picture</label>
              <input type="file" accept="image/*" @change="handleFileChange" />
            </div>
            <div v-if="previewImage">
              <img :src="previewImage" alt="" />
            </div>
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
      <div class="already">
        <label
          >Already have an account,
          <router-link to="/login" class="link"> Login Here </router-link>
        </label>
      </div>
    </div>
  </div>
</template>
