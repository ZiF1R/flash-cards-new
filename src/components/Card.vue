<template>
  <card-head
    :locale="locale"
    :activeSettings="activeSettings"
    :card="card"
    @removeCard="deleteCard"
    @showSettings="$emit(`showSettings`)"
  />
  <card-info :locale="locale" :card="card" />
</template>

<script>
import localizeFilter from "@/locale/locale";
import CardHead from "@/components/card-components/CardHead";
import CardInfo from "@/components/card-components/CardInfo";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Card",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    activeSettings: {
      type: Boolean,
      default: false,
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

  emits: ["showSettings"],

  components: {
    CardHead,
    CardInfo,
  },

  methods: {
    ...mapGetters(["getFolders"]),
    ...mapActions(["removeCard"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    async deleteCard() {
      await this.removeCard({
        rootFolder: this.getRootFolder,
        cardToRemove: this.card,
      });
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
