<template>
  <app-nav :locale="locale" />
  <scroll-lang :locale="locale" @changeLang="changeLang($event)" />
</template>

<script>
import AppNav from "@/components/static-components/Nav";
import ScrollLang from "@/components/static-components/ScrollLang";

export default {
  name: "StaticElements",

  components: {
    AppNav,
    ScrollLang,
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
