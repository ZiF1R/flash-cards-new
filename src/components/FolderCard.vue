<template>
  <folder-card-head
    :locale="locale"
    :folder="folder"
    :cardsLength="cardsLength"
    :showSettings="showSettings"
    @removeFolder="deleteFolder"
    @showSettings="$emit('showSettings')"
  />
  <folder-card-info :locale="locale" :folder="folder" />
</template>

<script>
import localizeFilter from "@/locale/locale";
import FolderCardHead from "@/components/folder-card-components/FolderCardHead";
import FolderCardInfo from "@/components/folder-card-components/FolderCardInfo";
import { mapActions } from "vuex";

export default {
  name: "FolderCard",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    cardsLength: {
      type: Number,
      default: 0,
    },
    folder: {
      type: Object,
      default: () => ({
        data: {
          name: "",
          category: "none",
          memorized: 0,
          created: {
            day: "",
            time: "",
          },
        },
        cards: [],
      }),
    },
    showSettings: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["showSettings"],

  components: {
    FolderCardHead,
    FolderCardInfo,
  },

  methods: {
    ...mapActions(["removeFolder"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    async deleteFolder() {
      await this.removeFolder(this.folder);
    },
  },
};
</script>
