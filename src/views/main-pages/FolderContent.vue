<template>
  <routes-temp>
    <template v-slot:page_head>
      <img src="@/assets/home/folderIcon.svg" class="head__icon" />
      <span class="head__text">{{ localize("Folders") }}</span>
    </template>
    <template v-slot:page_path>
      <div class="path">
        <router-link to="/folders" class="root">
          {{ localize("Folders") }}
        </router-link>
        <img src="@/assets/folder/left-arrow.svg" class="arrow" />
        <span class="current-folder">
          {{ $router.currentRoute._value.params.folder_name }}
        </span>
      </div>
    </template>
    <template v-slot:page_filters>
      <div class="filters">
        <span class="filter-marker"></span>
        <span
          v-for="filter in filters"
          :key="filter.name"
          @click.left="activateFilter($event, filter.name)"
          :class="{ filter_active: filter.name === `all`, [filter.name]: true }"
          class="filter"
        >
          {{ localize(filter.content) }}
        </span>
      </div>
    </template>
    <template v-slot:page_content>
      <div class="page__content">
        <div class="card" v-for="card in sortedCards" :key="card.name">
          <Card
            :card="card"
            :locale="locale"
            :activeSettings="activeSettings === card"
            @showSettings="openSettings(card)"
          />
        </div>
        <AddCardButton :locale="locale" @createCard="createCard($event)" />
      </div>
      <span class="space">not a bug, just a feature :)</span>
    </template>
  </routes-temp>
</template>

<script>
import localizeFilter from "@/locale/locale";
import Card from "@/components/Card";
import RoutesTemp from "@/components/RoutesTemp";
import AddCardButton from "@/components/card-components/AddCardButton";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FolderContent",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  components: {
    RoutesTemp,
    AddCardButton,
    Card,
  },

  data() {
    return {
      activeSettings: null,
      activeFilter: "all",
      filters: [
        {
          name: "all",
          content: "All",
        },
        {
          name: "memorized",
          content: "Memorized",
        },
        {
          name: "not-memorized",
          content: "Not Memorized",
        },
      ],
    };
  },

  mounted() {
    this.filterMarker();
  },

  methods: {
    ...mapGetters(["getFolders"]),
    ...mapActions(["sendCard"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    filterMarker() {
      const filterLine = document.querySelector(".filter-marker"),
        filter = document.querySelectorAll(".filter");
      let activeItem = document.querySelector(".filter_active");

      filterLine.style.width = `${activeItem.offsetWidth}px`;
      filterLine.style.left = `${activeItem.offsetLeft}px`;

      filter.forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          activeItem = document.querySelector(".filter_active");
          filterLine.style.width = `${e.currentTarget.offsetWidth}px`;
          filterLine.style.left = `${e.currentTarget.offsetLeft}px`;
        });

        el.addEventListener("mouseleave", () => {
          activeItem = document.querySelector(".filter_active");
          filterLine.style.width = `${activeItem.offsetWidth}px`;
          filterLine.style.left = `${activeItem.offsetLeft}px`;
        });
      });
    },
    activateFilter(e, filter) {
      document
        .querySelector(".filter_active")
        .classList.remove("filter_active");
      e.target.classList.add("filter_active");
      this.activeFilter = filter;
    },
    openSettings(card) {
      if (this.activeSettings === card) this.activeSettings = null;
      else this.activeSettings = card;
    },
    async createCard(newCard) {
      let rootFolder = this.getRootFolder;
      await this.sendCard({
        newCard,
        rootFolder,
      });
    },
  },

  computed: {
    sortedCards() {
      let sorted = [...this.getRootFolder.cards].sort(
        (a, b) => new Date(b.created) - new Date(a.created)
      );
      if (this.activeFilter === "all") return sorted;
      else if (this.activeFilter === "memorized")
        return sorted.filter((card) => card.memorized);
      else return sorted.filter((card) => !card.memorized);
    },
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

.path
  display: flex
  position: relative
  flex-direction: row
  align-items: center

  font-style: normal
  font-weight: 300
  font-size: 1em
  line-height: 20px

  margin-top: 0.7vh
  width: fit-content

.arrow
  height: 13px
  width: 35px

.filters
  display: flex
  position: relative
  flex-direction: row
  align-items: center

  font-style: normal
  font-weight: normal
  font-size: 1.0625em
  line-height: 24px

  width: fit-content
  margin-top: 4vh
  padding-bottom: 1.5vh

  .filter
    margin-right: 15px
    height: 100%
    cursor: pointer

  .filter-marker
    display: block
    position: absolute
    content: ""

    height: 3.5px
    width: 0px
    bottom: -6%
    left: 0%
    background: #00A3FF
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out

  .filter_active
    color: #00A3FF

.page__content
  display: flex
  flex-wrap: wrap
  justify-content: flex-start
  margin: 5vh 0 15vh

  @media screen and (max-width: 501px)
    justify-content: center

.card
  display: flex
  flex-direction: column
  position: relative

  margin-bottom: 25px
  margin-right: 1.8vw
  padding: 10px 15px
  min-height: calc( 140px - 20px )
  width: calc( 280px - 30px )

  background: #fff
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

.space
  visibility: hidden
</style>
