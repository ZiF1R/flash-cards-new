<template>
  <div class="overlay">
    <div class="pop-up">
      <div
        :title="localize(`Close`)"
        class="pop-up__close"
        @click.left="$emit('close')"
      >
        <img src="@/assets/home/CloseTab.svg" />
      </div>
      <span class="pop-up__title">
        <slot name="popup__title"></slot>
      </span>
      <div class="pop-up__content">
        <slot name="popup__content"></slot>
      </div>
      <div class="pop-up__buttons">
        <slot name="popup__buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import localizeFilter from "@/locale/locale";

export default {
  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  emits: ["close"],

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>

<style lang="sass" scoped>
.overlay
  display: flex
  position: fixed
  justify-content: center
  align-items: center

  left: 0
  right: 0
  top: 0
  bottom: 0

  background: rgba(0, 0, 0, .6)
  z-index: 100

.pop-up
  display: flex
  flex-direction: column
  position: relative

  padding: 40px 20px
  max-width: 450px
  width: calc( 32vw - 40px )
  min-width: 270px
  height: max-content

  background: var(#{--card-background-default})
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.1)

  @media screen and (max-width: 401px)
    width: 100%
    min-width: 0

.pop-up__close
  display: flex
  justify-content: center
  align-items: center
  position: absolute
  cursor: pointer

  right: 3%
  top: 2%
  width: 30px

  height: 30px

  &:hover
    background: var(#{--primary-color})

  &:active
    background-color: darken(#00A3FF, 5%)

  &:hover > img
    filter: invert(1)

  & > img
    width: 95%
    height: 95%

.pop-up__title
  font-style: normal
  font-weight: 300
  font-size: 1.625em
  line-height: 42px
  margin-bottom: 3.5vh

.pop-up__content
  display: flex
  flex-direction: column
  position: relative
  margin-bottom: 100px

.pop-up__buttons
  display: flex
  flex-direction: row
  justify-content: space-between
  position: relative
</style>
