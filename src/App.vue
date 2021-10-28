<template>
  <static-elements :locale="locale" @changeLang="changeLang($event)" />
  <Loader class="routes" v-if="loading" />
  <router-view v-else class="routes" :locale="locale" />
</template>

<script>
import StaticElements from "@/components/StaticElements";
import Loader from "@/components/other/Loader";
import { mapActions, mapGetters } from "vuex";
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
    ...mapGetters(["isThemeSwitched"]),
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
      if (this.isThemeSwitched()) this.changeTheme();
    },
    changeLang(lang) {
      this.locale = lang;
      localStorage.setItem("lang", this.locale);
    },
    changeTheme() {
      let rootStyles = document.querySelector(":root");
      let variables = [
        "body-background",
        "card-background",
        "text-color",
        "text-color-opacity",
        "option-hover-background",
        "nav-background",
        "nav-icon-background",
        "nav-icon-color",
      ];

      variables.forEach((variable) => {
        rootStyles.style.setProperty(
          `--${variable}-default`,
          `var(--${variable}-dark)`
        );
      });
    },
  },
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300&display=swap')
@import "@/sass/variables"

::-webkit-scrollbar
  width: 0%

*
  margin: 0px
  padding: 0px
  font-family: 'Roboto', sans-serif

body
  position: relative
  height: 100vh
  background-color: var(#{--body-background-default})
  color: var(#{--text-color-default})
  font-size: 16px

h1, h2, h3, h4, h5, h6
  margin: 0
  padding: 0

a
  color: var(#{--text-color-default})

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
