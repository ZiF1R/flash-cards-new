<template>
  <pop-up-temp @close="$emit('close')">
    <template v-slot:popup__content>
      <span class="notify">
        <slot name="confirm__message"></slot>
      </span>
    </template>
    <template v-slot:popup__buttons>
      <button class="button confirm" @click.left="$emit('confirmed')">
        <slot name="confirm-button__text"></slot>
      </button>
      <button class="button reject" @click.left="$emit('close')">
        {{ localize("Cancel") }}
      </button>
    </template>
  </pop-up-temp>
</template>

<script>
import localizeFilter from "@/locale/locale";
import PopUpTemp from "@/components/pop-ups/PopUpTemp";

export default {
  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  emits: ["close", "confirmed"],

  components: {
    PopUpTemp,
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>

<style lang="sass" scoped>
.notify
  font-style: normal
  font-weight: normal
  font-weight: 300
  font-size: 20px
  line-height: 24px
  text-align: left

button
  font-style: normal
  font-weight: normal
  font-size: 16px
  line-height: 28px

  border-radius: 5px
  padding: 1.3vh 4vw

  cursor: pointer
  color: #fff
  background: none
  border: none
  outline: none

.reject
    background-color: #00A3FF

    &:hover
      background-color: lighten(#00A3FF, 5%)

    &:active
      background-color: darken(#00A3FF, 5%)

.confirm
    background-color: #DA2929

    &:hover
      background-color: lighten(#DA2929, 5%)

    &:active
        background-color: darken(#DA2929, 5%)
</style>
