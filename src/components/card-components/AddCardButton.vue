<template>
  <div
    @click="showAddCard = true"
    :title="localize(`Add new card`)"
    class="add-new"
  >
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0)">
        <path
          d="M69.3 38H2.69999C1.20959 38 0 37.552 0 37C0 36.448 1.20959 36 2.69999 36H69.3C70.7904 36 72 36.448 72 37C72 37.552 70.7904 38 69.3 38Z"
        />
        <path
          d="M36 73C35.448 73 35 71.7904 35 70.3V3.69999C35 2.20959 35.448 1 36 1C36.552 1 37 2.20959 37 3.69999V70.3C37 71.7904 36.552 73 36 73Z"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="72" height="72" fill="white" />
        </clipPath>
      </defs>
    </svg>
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
  background: var(#{--nav-background-default})
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

  &:hover > svg
    fill: var(#{--icon-color-dark})

  & > svg
    margin-top: 0
    width: 60%
    height: 60%
    fill: var(#{--icon-color-default})
</style>
