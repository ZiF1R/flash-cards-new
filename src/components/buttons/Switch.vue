<template>
  <div
    :class="{ 'switch-active': this.switchReview || this.switchTheme }"
    class="switch"
    @click.left="switchBtn($event)"
  ></div>
</template>

<script>
export default {
  props: {
    titleList: String,
    switchedReview: Boolean,
    switchedTheme: Boolean,
  },
  data() {
    return {
      switchReview: /reversed/i.test(this.titleList) && this.switchedReview,
      switchTheme: /theme/i.test(this.titleList) && this.switchedTheme,
    };
  },
  methods: {
    switchBtn(e) {
      e.target.classList.toggle("switch-active");
      this.$emit("switchChanged");
    },
  },
};
</script>

<style lang="sass">
.switch
  display: flex
  align-items: center
  position: relative
  background: #ccc
  width: 40px
  height: 18px
  border-radius: 50px
  cursor: pointer
  transition: background .15s ease-in-out

  &::before
    position: absolute
    border-radius: 50px
    background: #fff
    content: ""
    left: 6%
    width: 13px
    height: 13px
    transition: left .2s ease-in-out

.switch-active
  background: #00A3FF!important

  &::before
    left: 60%!important
</style>
