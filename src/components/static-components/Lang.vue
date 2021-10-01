<template>
  <div class="lang">
    <div class="lang__current" @click="showLangs = !showLangs">
      <div class="lang__text">
        {{ showActiveLang }}
      </div>
      <div class="lang__arrow"></div>
    </div>
    <div v-if="showLangs" class="lang__list">
      <span
        :class="{ item_active: locale === lang }"
        class="list__item"
        @click="selectLang(lang)"
        v-for="lang in langs"
        :key="lang"
      >
        {{ lang }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Lang",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  emits: ["changeLang"],

  data() {
    return {
      showLangs: false,
      langs: ["EN", "RU", "JP"],
    };
  },

  methods: {
    selectLang(lang) {
      this.$emit("changeLang", lang);
      this.showLangs = false;
    },
  },

  computed: {
    showActiveLang() {
      return this.langs.filter((lang) => lang === this.locale)[0];
    },
  },
};
</script>

<style lang="sass">
.lang
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between

  position: relative
  width: 3vw
  height: 4vh
  cursor: pointer

  font-style: normal
  font-weight: 300
  font-size: 1em
  line-height: 28px
  z-index: 20

.lang__current
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  width: 100%
  height: 100%

.lang__arrow
  width: 30%
  height: 100%
  background-image: url('../../assets/home/down-arrow.svg')
  background-position: center center
  background-repeat: no-repeat
  background-size: contain

.lang__list
  display: flex
  position: relative
  flex-direction: column
  align-items: center

  width: 5vw
  height: auto

  background: #fff
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

  border-radius: 5px
  margin-top: 1vh
  padding: 1vh 0vw

  &::before
    position: absolute
    content: ""

    width: 20px
    height: 20px
    top: -5%
    left: calc( 50% - 10px )

    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1)
    background: inherit
    transform: rotate(45deg)
    z-index: -1

  .list__item
    text-align: center
    width: 100%
    padding: 0.2vh 0

    &:hover
      background: darken(#fff, 3%)

  .item_active
    background: darken(#fff, 3%)
</style>
