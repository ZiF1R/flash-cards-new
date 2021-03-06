<template>
  <pop-up-temp @close="$emit('close')" :locale="locale">
    <template v-slot:popup__title>
      {{ localize("Add new card") }}
    </template>
    <template v-slot:popup__content>
      <input
        v-for="(input, index) in fields"
        :key="index"
        autocomplete="off"
        type="text"
        class="input"
        :placeholder="localize(input.content)"
        :title="localize(input.content)"
        v-model.trim="card[input.model]"
      />
    </template>
    <template v-slot:popup__buttons>
      <button
        class="button create"
        :title="localize(`Create`)"
        @click.left="createCard"
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

export default {
  name: "AddCard",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  emits: ["close", "createCard"],

  components: {
    PopUpTemp,
  },

  data() {
    return {
      card: {
        term: "",
        definition: "",
        examples: "",
        memorized: false,
        review: {
          wrong: 0,
          right: 0,
        },
        created: "",
      },
      fields: [
        {
          content: "Term",
          model: "term",
        },
        {
          content: "Definition",
          model: "definition",
        },
        {
          content: "Examples",
          model: "examples",
        },
      ],
    };
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    createCard() {
      if (this.card.term && this.card.definition) {
        this.card.created = new Date().toUTCString();
        this.$emit("createCard", this.card);
        this.$emit("close");
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.input
    font-style: normal
    font-weight: 300
    font-size: 1.1875em
    line-height: 28px

    border: none
    outline: none
    background: unset
    color: var(#{--text-color-default})

    margin-bottom: 3vh
    width: 100%
    border-bottom: 1px solid var(#{--text-color-default})

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
    background-color: var(#{--primary-color})

    &:hover
      background-color: lighten(#00A3FF, 5%)

    &:active
      background-color: darken(#00A3FF, 5%)

.cancel
    background-color: var(#{--danger-color})

    &:hover
      background-color: lighten(#DA2929, 5%)

    &:active
      background-color: darken(#DA2929, 5%)
</style>
