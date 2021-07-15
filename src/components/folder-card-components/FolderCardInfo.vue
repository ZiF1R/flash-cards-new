<template>
  <div class="folder__info">
    <div
      class="folder__name"
      @click.left="this.$emit('goToFolder', { folder, index })"
    >
      {{ folder.data.name }}
    </div>
    <div class="folder__category">
      {{ localize("Category") }}: {{ folder.data.category }}
    </div>
    <div class="folder__memorized">
      {{ showMemorized }} {{ localize("memorized") }}
    </div>
    <div class="folder__date">
      {{ localize("Added") }} {{ showCreatingDate() }}
    </div>
  </div>
</template>

<script>
import localizeFilter from "@/locale/locale";

export default {
  name: "FolderCardInfo",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    folder: {
      type: Object,
      default: () => ({
        data: {
          name: "",
          category: "none",
          memorized: 0,
          created: "",
        },
        cards: [],
      }),
    },
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    showCreatingDate() {
      return new Date(this.folder.data.created).toLocaleString();
    },
  },

  computed: {
    showMemorized() {
      if (!this.folder.cards) return "0/0";
      else {
        let memorized = Object.values(this.folder.cards).filter(
          (el) => el.memorized
        );
        return `${memorized.length}/${Object.values(this.folder.cards).length}`;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.folder__info
  display: flex
  flex-direction: column
  margin-top: 1vh
  width: 100%
  min-height: max-content

.folder__name
  width: fit-content
  cursor: pointer
  font-style: normal
  font-weight: normal
  font-size: 16px
  line-height: 24px

.folder__category
  font-style: normal
  font-weight: 300
  font-size: 14px
  line-height: 18px

.folder__memorized
  font-style: normal
  font-weight: 300
  font-size: 14px
  line-height: 18px

.folder__date
  position: absolute
  bottom: 6%
  right: 5%

  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none
  -ms-user-select: none

  font-style: normal
  font-weight: 300
  font-size: 12px
  line-height: 16px
  color: rgba(0, 0, 0, 0.5)
</style>
