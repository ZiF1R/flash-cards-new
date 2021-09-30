<template>
  <div class="lang-and-scroll">
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
    <div @mousedown.left="drugMarker($event)" class="scroll">
      <span class="scroll__marker"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scroll_and_Lang",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  emits: ["changeLang"],

  created() {
    window.addEventListener("scroll", this.scrollMarker);
  },

  data() {
    return {
      showLangs: false,
      canDrag: true,
      langs: ["EN", "RU", "JP"],
    };
  },

  methods: {
    scrollMarker() {
      const marker = document.querySelector(".scroll__marker");
      const home = document.querySelector(".routes");
      const windowHeight = home.offsetHeight - window.innerHeight;

      marker.style.top = `${(window.scrollY * 100) / windowHeight - 1}%`;
    },
    drugMarker(event) {
      this.canDrag = true;
      const marker = document.querySelector(".scroll__marker");
      const scroll = document.querySelector(".scroll");
      const route = document.querySelector(".routes");
      const windowHeight = route.offsetHeight - window.innerHeight;

      marker.style.top = `${(event.offsetY / scroll.offsetHeight) * 100}%`;
      let scrollToY =
        windowHeight * ((event.offsetY / scroll.offsetHeight) * 100);
      window.scrollTo(0, scrollToY / 100);

      scroll.onmousemove = (e) => {
        if (this.canDrag) {
          marker.style.top = `${(e.offsetY / scroll.offsetHeight) * 100}%`;
          let scrollToYlocal =
            windowHeight * ((e.offsetY / scroll.offsetHeight) * 100);
          window.scrollTo(0, scrollToYlocal / 100);
        }
      };
      scroll.onmouseup = () => {
        this.canDrag = false;
      };
    },
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
.lang-and-scroll
  right: 0vw
  top: 2vh
  position: fixed
  margin: 3vh 2vw
  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none
    // z-index: 40

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

.scroll
  display: flex
  justify-content: center
  position: fixed
  margin-top: 7vh

  width: 0.09vw
  height: 77vh
  padding: 0 1.5vw
  z-index: -2

  &::before
    display: block
    height: 100%
    width: 0.09vw
    background: #000
    content: ""
    top: 0%
    right: 0%

.scroll__marker
  position: absolute

  width: 15px
  height: 15px
  top: -1%

  background: #f8f8f8
  border: 1.5px solid #000
  border-radius: 50%
  pointer-events: none
</style>
