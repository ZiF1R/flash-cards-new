<template>
  <static-elements :locale="locale" @changeLang="changeLang($event)" />
  <Loader class="routes" v-if="loading" />
  <router-view v-else class="routes" :locale="locale" @login="login($event)" />
</template>

<script>
import StaticElements from "@/components/StaticElements";
import Loader from "@/components/other/Loader";
import { mapActions } from "vuex";

export default {
  name: "App",

  components: {
    StaticElements,
    Loader,
  },

  data() {
    return {
      locale: "",
      loading: true,
    };
  },

  async created() {
    this.locale = localStorage.getItem("lang") || "EN";
    await this.fetchUser();
    this.loading = false;
  },

  methods: {
    changeLang(lang) {
      this.locale = lang;
      localStorage.setItem("lang", this.locale);
    },
    login(user) {
      this.User = user;
      this.$router.push("/profile");
    },
    ...mapActions(["fetchUser"]),
  },
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300&display=swap')

::-webkit-scrollbar
  width: 0%

*
  margin: 0px
  padding: 0px
  font-family: 'Roboto', sans-serif

body
  position: relative
  height: 100vh
  background-color: #F8F8F8

h1, h2, h3, h4, h5, h6
  margin: 0
  padding: 0

.routes
  margin-left: 26vw
  width: 66vw
  min-height: 100vh
</style>
