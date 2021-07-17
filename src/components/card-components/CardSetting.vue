<template>
  <div @click="$emit(`tap`)">
    <img
      v-if="icon === `edit`"
      src="@/assets/home/edit.svg"
      class="setting__icon"
    />
    <img
      v-if="icon === `copy`"
      src="@/assets/folder/copy.svg"
      class="setting__icon"
    />
    <img
      v-if="icon === `remove`"
      src="@/assets/home/remove.svg"
      class="setting__icon"
    />
    <span class="setting__text" :class="{ remove__text: icon === `remove` }">{{
      localize(text)
    }}</span>
  </div>
</template>

<script>
import localizeFilter from "@/locale/locale";

export default {
  name: "CardSetting",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    icon: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    func: {
      type: Function,
    },
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>

<style lang="sass" scoped>
.setting__icon
  margin-right: 0.5vw
  width: 15px
  height: 15px

.remove__text
  color: #CE1010
</style>
