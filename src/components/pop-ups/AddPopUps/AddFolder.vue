<template>
  <pop-up-temp @close="$emit('close')" :locale="locale">
    <template v-slot:popup__title>
      {{ localize("Create new folder") }}
    </template>
    <template v-slot:popup__content>
      <input
        autocomplete="off"
        type="text"
        class="folder-name"
        :placeholder="localize(`Folder name`)"
        :title="localize(`Folder name`)"
        maxlength="30"
        v-model.trim="folder.data.name"
      />
      <label class="label-categories" for="categories">
        {{ localize("Category") }}:
        <select id="categories" v-model="folder.data.category">
          <option v-for="category in getCategories()" :key="category">
            {{ category }}
          </option>
        </select>
      </label>
      <button class="add-category" @click="showAddCategory = true">
        {{ localize("Add new category") }}
      </button>
    </template>
    <template v-slot:popup__buttons>
      <button
        class="button create"
        :title="localize(`Create`)"
        @click.left="createFolder"
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
  <AddCategory
    v-if="showAddCategory"
    :locale="locale"
    @close="showAddCategory = false"
  />
</template>

<script>
import localizeFilter from "@/locale/locale";
import PopUpTemp from "@/components/pop-ups/PopUpTemp";
import AddCategory from "@/components/pop-ups/AddPopUps/AddCategory";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddFolder",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  emits: ["close"],

  components: {
    PopUpTemp,
    AddCategory,
  },

  data() {
    return {
      folder: {
        data: {
          name: "",
          category: "none",
          memorized: 0,
          created: "",
        },
        cards: [],
      },
      showAddCategory: false,
    };
  },

  methods: {
    ...mapGetters(["getCategories", "getFolders"]),
    ...mapActions(["sendFolder"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    async createFolder() {
      if (this.folder.data.name !== "") {
        this.folder.data.created = new Date().toUTCString();
        (await this.sendFolder(this.folder)) && this.$emit("close");
      }
    },
  },
};
</script>

<style lang="sass">
.folder-name
    font-style: normal
    font-weight: 300
    font-size: 19px
    line-height: 28px

    border: none
    outline: none

    margin-bottom: 0vh
    width: 100%
    border-bottom: 1px solid #000

.label-categories
    display: flex
    justify-content: flex-start
    font-style: normal
    font-weight: 300
    font-size: 19px
    line-height: 28px
    margin-top: 3vh

    width: 100%
    border-bottom: 1px solid #000

#categories
    flex: 1 0 auto
    font-style: normal
    font-weight: 300
    font-size: 16px
    line-height: 28px

    color: rgba(0, 0, 0, 0.7)
    border: none
    outline: none
    background: inherit

.add-category
    font-style: normal
    font-weight: 300
    font-size: 16px
    line-height: 28px

    padding: 0.2vh 0
    cursor: pointer
    margin-top: 3vh
    width: 100%

    background: #F1F1F1
    border: none
    outline: none

    &:hover
      background: darken(#F1F1F1, 2%)

    &:active
      background-color: darken(#F1F1F1, 4%)

.button
    font-style: normal
    font-weight: normal
    font-size: 16px
    line-height: 28px

    border-radius: 5px
    padding: 1.3vh 4vw

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
