<template>
  <div>
    <app-nav :locale="locale" />
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
  },
};
</script>

<style lang="sass">
.lang-component
  right: 0vw
  top: 2vh
  position: fixed
  margin: 3vh 2vw
  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none
</style>
