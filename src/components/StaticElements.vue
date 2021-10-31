<template>
  <app-nav class="nav" :locale="locale" @closeNav="changeNavVisibility" />
  <div class="panel">
    <button @click="changeNavVisibility">
      <img src="@/assets/home/menu.svg" alt="menu" />
    </button>
    <lang
      class="lang-component"
      :locale="locale"
      @changeLang="changeLang($event)"
    />
  </div>
  <scroll />
</template>

<script>
import AppNav from "@/components/static-components/Nav";
import Scroll from "@/components/static-components/Scroll";
import Lang from "@/components/static-components/Lang";

export default {
  name: "StaticElements",

  components: {
    AppNav,
    Scroll,
    Lang,
  },

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  emits: ["changeLang"],

  methods: {
    changeLang(lang) {
      this.$emit("changeLang", lang);
    },
    changeNavVisibility() {
      document.body.querySelector(".nav").classList.toggle("nav_show");
    },
  },
};
</script>

<style lang="sass" scoped>
.lang-component
  right: 0vw
  top: 2vh
  position: fixed
  margin: 2vh 2vw
  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none

.panel > button
  display: none
  background: var(#{--primary-color})
  outline: none
  border: none
  width: 40px
  height: 100%
  cursor: pointer
  z-index: 30

  img
    filter: invert(1)
    width: 65%
    height: 65%

@media screen and (max-width: 900px)
  .nav
    display: none

  .nav_show
    display: flex

  .panel
    display: flex
    position: relative
    justify-content: space-between

    background: var(#{--card-background-default})
    width: 100vw
    height: 40px

    & > button
      display: flex
      justify-content: center
      align-items: center

  .lang-component
    position: relative
    border-left: 1px solid var(#{--text-color-opacity-default})

    width: 40px
    height: 100%

    margin: 0
    padding: 0 7px 0 15px
    top: 0
</style>
