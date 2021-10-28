<template>
  <div class="setting" @click="$emit(`tap`)">
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

  emits: ["tap"],

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>

<style lang="sass" scoped>
.setting
    display: flex
    flex-direction: row
    text-align: left
    align-items: center
    width: calc( 100% - 16px )
    height: 3vh
    padding: 1.5px 8px

    &:hover
      background: var(#{--option-hover-background-default})

.setting__icon
  margin-right: 6px
  width: 15px
  height: 15px

.remove__text
  color: var(#{--danger-color})
</style>
