<template>
  <pop-up-temp @close="$emit('close')">
    <template v-slot:popup__title>{{ localize("Edit card") }}</template>
    <template v-slot:popup__content>
      <input
        v-for="input in fields"
        :key="input.content"
        type="text"
        class="input"
        :placeholder="localize(input.content)"
        :title="localize(input.content)"
        v-model.trim="editData[input.model]"
      />
    </template>
    <template v-slot:popup__buttons>
      <button class="button confirm" @click.left="editCard">
        {{ localize("Save") }}
      </button>
      <button class="button reject" @click.left="$emit('close')">
        {{ localize("Cancel") }}
      </button>
    </template>
  </pop-up-temp>
</template>

<script>
import localizeFilter from "@/locale/locale";
import PopUpTemp from "@/components/pop-ups/PopUpTemp";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditCard",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    card: {
      type: Object,
      default: () => ({
        term: "",
        definition: "",
        examples: "",
        memorized: false,
        review: {
          wrong: 0,
          right: 0,
        },
        created: "",
      }),
    },
  },

  emits: ["close"],

  components: {
    PopUpTemp,
  },

  data() {
    return {
      editData: {
        term: this.card.term,
        definition: this.card.definition,
        examples: this.card.examples,
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
    ...mapActions(["changeCard"]),
    ...mapGetters(["getFolders"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    async editCard() {
      let rootFolder = this.getRootFolder;
      this.editData.term &&
        this.editData.definition &&
        (await this.changeCard({
          oldCard: this.card,
          editedCard: this.editData,
          rootFolder,
        })) &&
        this.$emit("close");
    },
  },

  computed: {
    getRootFolder() {
      let rootFolder = this.getFolders().filter(
        (folder) =>
          folder.data.name ===
          this.$router.currentRoute._value.params.folder_name
      );
      return rootFolder ? rootFolder[0] : null;
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
    border-bottom: 1px solid var(#{--text-color-opacity-default})

button
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

.reject
    background-color: var(#{--danger-color})

    &:hover
      background-color: lighten(#DA2929, 5%)

    &:active
        background-color: darken(#DA2929, 5%)

.confirm
    background-color: var(#{--primary-color})

    &:hover
      background-color: lighten(#00A3FF, 5%)

    &:active
      background-color: darken(#00A3FF, 5%)
</style>
