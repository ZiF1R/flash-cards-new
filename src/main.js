import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import "./registerServiceWorker";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
  apiKey: "AIzaSyDyOC9Fw2ZEY4wFJcP_T6jvxPX0rwptWJI",
  authDomain: "flash-cards-65870.firebaseapp.com",
  projectId: "flash-cards-65870",
  storageBucket: "flash-cards-65870.appspot.com",
  messagingSenderId: "518469244345",
  appId: "1:518469244345:web:b2aa0ff73096d9b3459268",
  measurementId: "G-2V9YXRHD65",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).use(store).mount("#app");
  }
});
