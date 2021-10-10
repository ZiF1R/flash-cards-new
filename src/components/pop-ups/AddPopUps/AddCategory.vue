<template>
  <pop-up-temp @close="$emit('close')" :locale="locale">
    <template v-slot:popup__title>
      {{ localize("Create new category") }}
    </template>
    <template v-slot:popup__content>
      <input
        autocomplete="off"
        type="text"
        class="category-name"
        :placeholder="localize(`Category name`)"
        :title="localize(`Category name`)"
        maxlength="30"
        v-model.trim="categoryName"
      />
    </template>
    <template v-slot:popup__buttons>
      <button
        class="button create"
        :title="localize(`Create`)"
        @click.left="createCategory"
      >
        {{ localize("Create") }}
      </button>
      <button
        class="button cancel"
        :title="localize(`Close`)"
        @click.left="$emit('close')"
      >
        {{ localize("Cancel") }}
      </button>
    </template>
  </pop-up-temp>
</template>

<script>
import localizeFilter from "@/locale/locale";
import PopUpTemp from "@/components/pop-ups/PopUpTemp";
import { mapActions } from "vuex";

export default {
  name: "AddCategory",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  data() {
    return {
      categoryName: "",
    };
  },

  emits: ["close"],

  components: {
    PopUpTemp,
  },

  methods: {
    ...mapActions(["sendCategory"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    async createCategory() {
      if (this.categoryName) {
        await this.sendCategory(this.categoryName);
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.category-name
    font-style: normal
    font-weight: 300
    font-size: 1.1875em
    line-height: 28px

    border: none
    outline: none

    margin-bottom: 0vh
    width: 100%
    border-bottom: 1px solid #000

.button
    font-style: normal
    font-weight: normal
    font-size: 1em
    line-height: 28px

    border-radius: 5px
    padding: 10px 30px

    cursor: pointer
    color: #fff
    background: none
    border: none
    outline: none

.create
    background-color: #00A3FF

    &:hover
      background-color: lighten(#00A3FF, 5%)

    &:active
      background-color: darken(#00A3FF, 5%)

.cancel
    background-color: #DA2929

    &:hover
      background-color: lighten(#DA2929, 5%)

    &:active
      background-color: darken(#DA2929, 5%)
</style>
