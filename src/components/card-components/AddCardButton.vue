<template>
  <div
    @click="showAddCard = true"
    :title="localize(`Add new card`)"
    class="add-new"
  >
    <img src="@/assets/home/plus.svg" />
  </div>
  <AddCard
    v-if="showAddCard"
    :locale="locale"
    @close="showAddCard = false"
    @createCard="$emit(`createCard`, $event)"
  />
</template>

<script>
import localizeFilter from "@/locale/locale";
import AddCard from "@/components/pop-ups/AddPopUps/AddCard";
// import { mapGetters } from "vuex";

export default {
  name: "AddCardButton",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  emits: ["createCard"],

  components: {
    AddCard,
  },

  data() {
    return {
      showAddCard: false,
    };
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>

<style lang="sass" scoped>
.add-new
  display: flex
  position: fixed
  flex-direction: column
  justify-content: center
  align-items: center

  border-radius: 50%
  background: var(#{--card-background-default})
  width: 55px
  height: 55px
  bottom: 5%
  left: 55%

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15)

  @media screen and (max-width: 901px)
    left: 45%

  &:hover
    background: var(#{--primary-color})
    cursor: pointer

  &:active
    background-color: darken(#00A3FF, 5%)

  &:hover > img
    filter: invert(1)

  & > img
    margin-top: 0
    width: 60%
    height: 60%
</style>
