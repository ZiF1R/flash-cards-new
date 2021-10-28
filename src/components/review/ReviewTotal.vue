<template>
  <pop-up-temp @close="$emit('close')" :locale="locale">
    <template v-slot:popup__title>
      {{ localize("Results") }}
    </template>
    <template v-slot:popup__content>
      <div class="total__fields">
        <div class="total-cards">
          <span>
            {{ localize("Total cards") }}
          </span>
          <span class="dots"></span>
          <span>{{ totalCards }} {{ localize("card(s)") }}</span>
        </div>
        <div class="right-answers">
          <span>{{ localize("Right answers") }}</span>
          <span class="dots"></span>
          <span>{{ rightAnswers }} {{ localize("card(s)") }}</span>
        </div>
        <div class="wrong-answers">
          <span>{{ localize("Wrong answers") }}</span>
          <span class="dots"></span>
          <span>{{ wrongAnswers }} {{ localize("card(s)") }}</span>
        </div>
        <div class="time">
          <span>{{ localize("Time passed") }}</span>
          <span class="dots"></span>
          <span>
            {{ totalMinutes }}{{ localize("m") }} {{ totalSeconds
            }}{{ localize("s") }}
          </span>
        </div>
      </div>
    </template>
    <template v-slot:popup__buttons>
      <div class="finish-review">
        <button class="neutral" @click.left="$emit('close')">
          {{ localize("Finish") }}
        </button>
      </div>
    </template>
  </pop-up-temp>
</template>

<script>
import localizeFilter from "@/locale/locale";
import PopUpTemp from "@/components/pop-ups/PopUpTemp";

export default {
  name: "ReviewTotal",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    seconds: Number,
    rightAnswers: Number,
    wrongAnswers: Number,
    totalCards: Number,
  },

  emits: ["close"],

  components: {
    PopUpTemp,
  },

  data() {
    return {
      totalMinutes: null,
      totalSeconds: null,
    };
  },

  created() {
    this.getPassedTime();
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    getPassedTime() {
      /* eslint-disable */
      let time = this.seconds,
        seconds = (time / 60) - ~~(time / 60);
      this.totalMinutes = ~~(time / 60);
      this.totalSeconds = Math.round(seconds * 60);
    },
  },
};
</script>

<style lang="sass" scoped>
.total__fields
  display: flex
  position: relative
  align-items: flex-start
  flex-direction: column
  width: 100%

  font-style: normal
  font-weight: 300
  font-size: 1.125em
  line-height: 25px
  margin-top: 2vh

  > *
    width: 100%
    display: grid
    grid-template-columns: max-content 1fr max-content

  .dots
    border-bottom: 1px dotted var(#{--text-color-default})

.total__fields > div > div
  &:first-child
    padding-right: 0.4vw
  &:last-child
    padding-left: 0.4vw

.finish-review
  display: flex
  justify-content: flex-end

  > *
    font-style: normal
    font-weight: normal
    font-size: 1em
    line-height: 28px

    border-radius: 5px
    padding: 1vh 3.5vw

    cursor: pointer
    color: var(#{--text-color-default})
    background: none
    border: none
    outline: none

  .neutral
    background-color: var(#{--primary-color})

    &:hover
      background-color: lighten(#00A3FF, 5%)

    &:active
      background-color: darken(#00A3FF, 5%)
</style>
