<template>
  <static-elements :locale="locale" @changeLang="changeLang($event)" />
  <Loader class="routes" v-if="loading" />
  <router-view v-else class="routes" :locale="locale" />
</template>

<script>
import StaticElements from "@/components/StaticElements";
import Loader from "@/components/other/Loader";
import { mapActions } from "vuex";
import { _db } from "@/db.js";

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
    if (await _db.isSignIn()) {
      await this.loadData();
      this.loading = false;
    } else {
      this.loading = false;
      this.$router.push("/login");
    }
  },

  methods: {
    ...mapActions([
      "fetchUser",
      "fetchFolders",
      "fetchCategories",
      "fetchSettings",
    ]),
    async loadData() {
      await this.fetchUser();
      await this.fetchFolders();
      await this.fetchCategories();
      await this.fetchSettings();
    },
    changeLang(lang) {
      this.locale = lang;
      localStorage.setItem("lang", this.locale);
    },
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
  font-size: 16px

h1, h2, h3, h4, h5, h6
  margin: 0
  padding: 0

.routes
  top: 0
  position: absolute
  margin-left: 26vw
  width: 66vw
  min-height: 100vh

  @media screen and (max-width: 901px) and (min-width: 601px)
    padding-top: 30px
    min-height: calc(100vh - 30px)
    margin-left: 40px
    width: calc(90vw - 20px)

  @media screen and (max-width: 601px)
    padding-top: 30px
    min-height: calc(100vh - 30px)
    margin-left: 20px
    width: calc(100vw - 20px)

@media screen and (max-width: 1200px)
  body
    font-size: 14px
</style>
