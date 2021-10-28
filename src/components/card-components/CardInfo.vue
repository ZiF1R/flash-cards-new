<template>
  <div class="card__info">
    <span class="card__term">
      {{ card.term }}
    </span>
    <span class="card__definition">
      {{ card.definition }}
    </span>
    <span class="card__examples">
      {{ card.examples }}
    </span>
  </div>
  <span class="card__date">
    {{ localize("Added") }} {{ showCreatingDate() }}
  </span>
</template>

<script>
import localizeFilter from "@/locale/locale";

export default {
  name: "CardInfo",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    card: {
      type: Object,
      default: () => ({
        term: "",
        definition: "",
        examples: "",
        memorized: false,
        review: {
          wrong: 0,
          right: 0,
        },
        created: "",
      }),
    },
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    showCreatingDate() {
      return new Date(this.card.created).toLocaleString();
    },
  },
};
</script>

<style lang="sass" scoped>
.card__info
  display: flex
  flex-direction: column
  margin-top: 1.5vh
  width: 100%
  padding-bottom: 3vh
  color: var(#{--text-color-default})

.card__term
  font-style: normal
  font-weight: normal
  font-size: 1em
  line-height: 22px
  margin-bottom: 0.2vh

.card__definition
  font-style: normal
  font-weight: 300
  font-size: 1em
  line-height: 18px
  margin-bottom: 0.7vh

.card__examples
  font-style: italic
  font-weight: 300
  font-size: 0.875em
  line-height: 18px

.card__date
  position: absolute
  bottom: 1.5vh
  right: 5%

  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none
  -ms-user-select: none

  font-style: normal
  font-weight: 300
  font-size: 0.75em
  line-height: 16px
  color: var(#{--text-color-opacity-default})
</style>
