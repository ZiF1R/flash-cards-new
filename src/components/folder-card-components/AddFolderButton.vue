<template>
  <div class="item add-new" @click.left="isOpen = true">
    <img src="@/assets/home/plus.svg" class="add-new__icon" />
    <span class="add-new__text">
      {{ localize("Add new folder") }}
    </span>
  </div>
  <AddFolder v-if="isOpen" :locale="locale" @close="isOpen = false" />
</template>

<script>
import localizeFilter from "@/locale/locale";
import AddFolder from "@/components/pop-ups/AddPopUps/AddFolder";

export default {
  name: "AddFolderButton",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  components: {
    AddFolder,
  },

  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>

<style lang="sass" scoped>
.item
  margin-bottom: 25px
  margin-right: 1.8vw
  height: 140px
  width: 280px
  background: #fff
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

.add-new
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  &:hover
    background: #00A3FF
    cursor: pointer

  &:active
    background-color: darken(#00A3FF, 5%)

  &:hover .add-new__text
    color: #fff

  &:hover .add-new__icon
    filter: invert(1)

.add-new__text
  margin-top: 1vh

  font-style: normal
  font-weight: 300
  font-size: 16px
  line-height: 28px

  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none

.add-new__icon
  margin-top: 1.5vh
  width: 45px
  height: 45px
</style>
