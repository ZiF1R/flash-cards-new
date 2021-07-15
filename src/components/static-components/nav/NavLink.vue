<template>
  <router-link class="router-link" :to="'/' + path">
    <div class="link__img">
      <div class="img" :class="link_id"></div>
    </div>
    <div class="link__text">
      {{ localize(`${link_name}`) }}
    </div>
  </router-link>
</template>

<script>
import localizeFilter from "@/locale/locale";

export default {
  name: "NavLink",
  props: {
    locale: {
      type: String,
      default: "EN",
    },
    path: {
      type: String,
      default: "",
    },
    link_id: {
      type: String,
      default: "",
    },
    link_name: {
      type: String,
      default: "",
    },
  },
  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>
