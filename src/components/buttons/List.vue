<template>
  <select class="list" @input="chooseOption($event.target)">
    <option
      :selected="
        (/cards/i.test(settingTitle) && item === cardsLimit) ||
        (/time/i.test(settingTitle) && item === timeLimit)
      "
      v-for="item of list"
      :key="item"
    >
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    titleList: String,
    currentTimeLimit: Number,
    currentCardsLimit: Number,
    from: Number,
    to: Number,
    delta: Number,
  },
  data() {
    return {
      settingTitle: this.titleList,
      cardsLimit: this.currentCardsLimit,
      timeLimit: this.currentTimeLimit,
      list: [],
    };
  },
  created() {
    for (let i = this.from; i < this.to + 1; i += this.delta) this.list.push(i);
  },
  methods: {
    chooseOption(e) {
      e.forEach((el) => el.selected && this.$emit("selectOption", +el.text));
    },
  },
};
</script>

<style lang="sass">
.list
    background: #fff
    border: none
    outline: none
    font: inherit
    letter-spacing: inherit
    word-spacing: inherit
    font-style: normal
    font-weight: 300
    font-size: 14px
    line-height: 20px
    padding: 6px 6px
    width: 5vw
    border-radius: 5px
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)
</style>
