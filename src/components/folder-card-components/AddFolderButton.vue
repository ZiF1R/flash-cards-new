<template>
  <div class="item add-new" @click.left="isOpen = true">
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M69.3 38H2.69999C1.20959 38 0 37.552 0 37C0 36.448 1.20959 36 2.69999 36H69.3C70.7904 36 72 36.448 72 37C72 37.552 70.7904 38 69.3 38Z"
        />
        <path
          d="M36 73C35.448 73 35 71.7904 35 70.3V3.69999C35 2.20959 35.448 1 36 1C36.552 1 37 2.20959 37 3.69999V70.3C37 71.7904 36.552 73 36 73Z"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="72" height="72" fill="white" />
        </clipPath>
      </defs>
    </svg>
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
@import "@/sass/variables"

.item
  margin-bottom: 25px
  margin-right: 1.8vw
  height: 140px
  width: 280px
  background: var(#{--card-background-default})
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

.add-new
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  user-select: none
  -ms-user-select: none
  -moz-user-select: -moz-none

  &.export
    pointer-events: none

  &:hover
    background: var(#{--primary-color})
    cursor: pointer

  &:active
    background-color: darken($primary-color, 5%)

  &:hover .add-new__text
    color: #fff

  &:hover > svg
    fill: var(#{--icon-color-dark})

.add-new__text
  margin-top: 1vh

  font-style: normal
  font-weight: 300
  font-size: 1em
  line-height: 28px

  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none

.add-new > svg
  margin-top: 1.5vh
  width: 45px
  height: 45px
  fill: var(#{--icon-color-default})
</style>
