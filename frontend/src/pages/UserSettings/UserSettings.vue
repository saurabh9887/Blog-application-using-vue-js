<script setup>
import { onMounted, reactive } from "vue";
import "./UserSettings.scss";
import axios from "axios";
import { useUserStore } from "../../Stores/userStore";

const userStore = useUserStore();
const userInfo = userStore.userInfo;

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

const form = reactive({
  username: "",
  email: "",
  password: "",
});

const handleUpdate = async () => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/user/edit/${userInfo.id}`
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/user/${userInfo.id}`
    );
    console.log(res.data);
    form.username = res.data.username;
    form.email = res.data.email;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="userSettings">
    <h1>Settings</h1>
    <div class="settingsWrapper">
      <div class="left">
        <div class="imgUpdate">
          <img
            :src="`http://localhost:3000/uploads/${userInfo.img
              .split('\\')
              .pop()}`"
            alt=""
          />
          <label>Change</label>
        </div>
        <div class="userInfo">
          <div class="userData">
            <label>Username: </label>
            <label>{{ userInfo.username }}</label>
          </div>
          <div class="userData">
            <label>Email: </label>
            <label>{{ userInfo.email }}</label>
          </div>
          <div class="userData">
            <label>Profile Created on: </label>
            <label>{{ formatDate(userInfo.createdAt) }}</label>
          </div>
        </div>
      </div>
      <div class="right">
        <form @submit.prevent="handleSubmit">
          <div class="data">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              v-model="form.username"
            />
          </div>
          <div class="data">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              v-model="form.email"
            />
          </div>
          <div class="data">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              v-model="form.password"
            />
          </div>
          <div class="buttons">
            <router-link to="/myblogs" class="link">
              <button class="myBlogs">My Blogs</button>
            </router-link>
            <router-link to="/" class="link">
              <button class="update" @click="handleUpdate">
                Update Profile
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
