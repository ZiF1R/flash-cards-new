<template>
  <pop-up-temp @close="$emit('close')" :locale="locale">
    <template v-slot:popup__title>
      {{ localize("Create new folder") }}
    </template>
    <template v-slot:popup__content>
      <input
        autocomplete="off"
        type="text"
        class="input"
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

<style lang="sass" scoped>
.input
    font-style: normal
    font-weight: 300
    font-size: 1.1875em
    line-height: 28px

    border: none
    outline: none
    color: var(#{--text-color-default})
    background: unset

    margin-bottom: 0vh
    width: 100%
    border-bottom: 1px solid var(#{--text-color-default})

.label-categories
    display: flex
    justify-content: flex-start
    font-style: normal
    font-weight: 300
    font-size: 1.1875em
    line-height: 28px
    margin-top: 3vh
    color: var(#{--text-color-opacity-default})

    width: 100%
    border-bottom: 1px solid var(#{--text-color-default})

#categories
    flex: 1 0 auto
    font-style: normal
    font-weight: 300
    font-size: 1em
    line-height: 28px

    color: var(#{--text-color-default})
    border: none
    outline: none
    background: var(#{--card-background-default})

.add-category
    font-style: normal
    font-weight: 300
    font-size: 1em
    line-height: 28px

    padding: 0.2vh 0
    cursor: pointer
    margin-top: 3vh
    width: 100%
    color: var(#{--text-color-opacity-default})

    background: var(#{--option-hover-background-default})
    border: none
    outline: none

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
