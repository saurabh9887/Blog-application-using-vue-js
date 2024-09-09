<script setup>
import { reactive } from "vue";
import "./Login.scss";
import axios from "axios";
import { useRouter } from "vue-router";

const form = reactive({
  username: "",
  password: "",
});

const router = useRouter();

const handleSubmit = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/auth/login", form);
    console.log(res.data);
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="login">
    <div class="loginWrapper">
      <h1>Welcome Back</h1>
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            v-model="form.password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div class="don't">
        <label
          >Don't have an account,
          <router-link to="/register" class="link"> Register Here </router-link>
        </label>
      </div>
    </div>
  </div>
</template>
