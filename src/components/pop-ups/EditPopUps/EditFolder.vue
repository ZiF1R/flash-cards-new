<template>
  <pop-up-temp @close="$emit('close')">
    <template v-slot:popup__title>{{ localize("Edit folder") }}</template>
    <template v-slot:popup__content>
      <input
        type="text"
        class="input"
        :placeholder="localize(`Folder name`)"
        :title="localize(`Folder name`)"
        maxlength="30"
        v-model.trim="editedFolder.data.name"
      />
      <label class="label-categories" for="categories">
        {{ localize("Category") }}:
        <select id="categories" v-model="editedFolder.data.category">
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
      <button class="button confirm" @click.left="editFolder">
        {{ localize("Save") }}
      </button>
      <button class="button reject" @click.left="$emit('close')">
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

  emits: ["close"],

  components: {
    PopUpTemp,
    AddCategory,
  },

  data() {
    return {
      showAddCategory: false,
      editedFolder: {
        data: {
          name: this.folder.data.name,
          category: this.folder.data.category,
        },
      },
    };
  },

  methods: {
    ...mapGetters(["getCategories"]),
    ...mapActions(["changeFolder"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    async editFolder() {
      this.folder.data.name &&
        (await this.changeFolder({
          oldFolder: this.folder,
          editedFolder: this.editedFolder,
        })) &&
        this.$emit("close");
    },
  },
};
</script>

<style lang="sass" scoped>
.input
    font-style: normal
    font-weight: 300
    font-size: 19px
    line-height: 28px

    border: none
    outline: none

    margin-bottom: 3vh
    width: 100%
    border-bottom: 1px solid #000

.label-categories
    display: flex
    justify-content: flex-start
    font-style: normal
    font-weight: 300
    font-size: 19px
    line-height: 28px

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

button
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

.reject
    background-color: #DA2929

    &:hover
      background-color: lighten(#DA2929, 5%)

    &:active
        background-color: darken(#DA2929, 5%)

.confirm
    background-color: #00A3FF

    &:hover
      background-color: lighten(#00A3FF, 5%)

    &:active
      background-color: darken(#00A3FF, 5%)

.add-category
    font-style: normal
    font-weight: 300
    font-size: 16px
    line-height: 28px

    padding: 0.2vh 0
    cursor: pointer
    margin-top: 3vh
    width: 100%
    color: #222

    background: #F1F1F1
    border: none
    outline: none

    &:hover
      background: darken(#F1F1F1, 2%)

    &:active
      background-color: darken(#F1F1F1, 4%)
</style>
