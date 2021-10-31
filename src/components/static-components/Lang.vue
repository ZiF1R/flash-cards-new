<template>
  <div class="lang">
    <div class="lang__current" @click="showLangs = !showLangs">
      <div class="lang__text">
        {{ showActiveLang }}
      </div>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 330 330"
        style="enable-background: new 0 0 330 330"
      >
        <path
          id="XMLID_225_"
          d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
        />
      </svg>
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

  position: relative
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
  height: 100%

.lang__current > svg
  width: 10px
  height: 10px
  margin-left: 7px
  fill: var(#{--icon-color-default})

.lang__list
  display: flex
  position: absolute
  flex-direction: column
  align-items: center

  width: 55px
  height: auto
  top: 100%

  background: var(#{--card-background-default})
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
      background: var(#{--option-hover-background-default})

  .item_active
    background: var(#{--option-hover-background-default})
</style>
