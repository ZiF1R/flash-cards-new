<template>
  <routes-temp>
    <template v-slot:page_head>
      <img src="@/assets/home/folderIcon.svg" class="head__icon" />
      <span class="head__text">{{ localize("Folders") }}</span>
    </template>
    <template v-slot:space>
      <div class="space"></div>
    </template>
    <template v-slot:page_content>
      <div class="home__content">
        <div
          class="folder item"
          v-for="(folder, index) in sortedFolders"
          :key="index"
        >
          <FolderCard
            :folder="folder"
            :cardsLength="(folder?.cards && folder.cards.length) || 0"
            :locale="locale"
            :showSettings="activeSettings === folder"
            @showSettings="openSettings(folder)"
          />
        </div>
        <AddFolderButton :locale="locale" />
      </div>
    </template>
  </routes-temp>
</template>

<script>
import localizeFilter from "@/locale/locale";
import RoutesTemp from "@/components/RoutesTemp";
import AddFolderButton from "@/components/folder-card-components/AddFolderButton";
import FolderCard from "@/components/FolderCard";
import { mapGetters } from "vuex";

export default {
  name: "Folders",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  components: {
    RoutesTemp,
    FolderCard,
    AddFolderButton,
  },

  data() {
    return {
      activeSettings: null,
    };
  },

  methods: {
    ...mapGetters(["getFolders"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    openSettings(folder) {
      if (this.activeSettings === folder) this.activeSettings = null;
      else this.activeSettings = folder;
    },
  },

  computed: {
    sortedFolders() {
      return this.getFolders().sort(
        (a, b) => new Date(b.data.created) - new Date(a.data.created)
      );
    },
  },
};
</script>

<style lang="sass" scoped>
.space
  margin-bottom: 2vh

.head__icon
    height: 100%
    width: 40px
    margin-right: 10px

    @media screen and (max-width: 901px)
      width: 30px

.head__text
    margin-top: 1vh
    font-style: normal
    font-weight: normal
    font-size: 1.875em
    line-height: 46px

.home__content
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  margin-top: 5vh

  @media screen and (max-width: 501px)
    justify-content: center

.item
  margin-bottom: 25px
  margin-right: 1.8vw
  height: 140px
  width: 280px
  background: var(#{--card-background-default})
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

.folder
  position: relative
  display: flex
  flex-direction: column
  padding: 10px 15px
  height: calc( 140px - 20px )
  width: calc( 280px - 30px )
</style>
