<template>
  <div class="scroll">
    <div @mousedown.left="drugMarker($event)">
      <span class="scroll__marker"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scroll",

  created() {
    window.addEventListener("scroll", this.scrollMarker);
  },

  data() {
    return {
      canDrag: true,
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
      const scroll = document.querySelector(".scroll > div");
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
  },
};
</script>

<style lang="sass">
.scroll
  right: 0vw
  top: 2vh
  position: fixed
  margin: 3vh 5vw
  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none

  @media screen and (max-width: 601px)
    display: none

.scroll > div
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
