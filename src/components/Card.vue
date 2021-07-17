<template>
  <card-head
    :locale="locale"
    :activeSettings="activeSettings"
    :card="card"
    @showSettings="$emit(`showSettings`)"
  />
  <card-info :locale="locale" :card="card" />
</template>

<script>
import localizeFilter from "@/locale/locale";
import CardHead from "@/components/card-components/CardHead";
import CardInfo from "@/components/card-components/CardInfo";

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
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>
