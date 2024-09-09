import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {
      username: "",
      email: "",
      id: "",
      createdAt: "",
      img: "",
    },
  }),
  actions: {
    setUserInfo(data) {
      this.userInfo = data;
      localStorage.setItem("userInfo", JSON.stringify(data)); // Save to local storage
    },
    loadUserInfo() {
      const savedUserInfo = localStorage.getItem("userInfo");
      if (savedUserInfo) {
        this.userInfo = JSON.parse(savedUserInfo);
      }
    },
    clearUserInfo() {
      this.userInfo = {
        username: "",
        email: "",
        id: "",
        createdAt: "",
        img: "",
      };
      localStorage.removeItem("userInfo"); // Clear from local storage
    },
  },
});
