<template>
  <div class="overlay">
    <div class="pop-up">
      <div
        :title="localize(`Close`)"
        class="pop-up__close"
        @click.left="$emit('close')"
      >
        <svg
          width="42"
          height="42"
          viewBox="0 0 42 42"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)" style="stroke-width: 5">
            <path
              d="M31.2958 11.8708L11.8708 31.2958C11.4361 31.7305 10.9527 31.9527 10.7917 31.7917C10.6307 31.6307 10.8528 31.1472 11.2875 30.7125L30.7125 11.2875C31.1472 10.8528 31.6307 10.6307 31.7917 10.7917C31.9527 10.9527 31.7305 11.4361 31.2958 11.8708Z"
            />
            <path
              d="M31.7917 31.7917C31.6307 31.9527 31.1472 31.7305 30.7125 31.2958L11.2875 11.8708C10.8528 11.4361 10.6307 10.9527 10.7917 10.7917C10.9527 10.6307 11.4361 10.8528 11.8708 11.2875L31.2958 30.7125C31.7305 31.1472 31.9527 31.6307 31.7917 31.7917Z"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect
                width="29.6985"
                height="29.6985"
                fill="white"
                transform="translate(0 21) rotate(-45)"
              />
            </clipPath>
          </defs>
        </svg>
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

  @media screen and (max-width: 501px)
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

  &:hover > svg
    fill: var(#{--icon-color-dark})

  & > svg
    width: 95%
    height: 95%
    fill: var(#{--icon-color-default})

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
