<template>
  <div class="folder__head">
    <div class="folder__settings">
      <img
        @click.left="$emit('showSettings')"
        src="@/assets/home/settings_folder.svg"
        class="show-settings"
      />
      <div v-if="showSettings" class="settings-wrapper">
        <div class="setting" @click.left="showEditForm">
          <img src="@/assets/home/edit.svg" class="edit__icon" />
          <span class="edit__text">{{ localize("Edit") }}</span>
        </div>
        <div class="setting" @click.left="showConfirmForm">
          <img src="@/assets/home/remove.svg" class="remove__icon" />
          <span class="remove__text">{{ localize("Remove") }}</span>
        </div>
      </div>
    </div>

    <img
      v-if="cardsLength > 0"
      class="folder__review"
      :title="localize('You can practice words from this folder')"
      src="@/assets/home/play-button.svg"
    />
    <img
      v-else
      class="folder__review"
      :title="localize('You cannot practice words from this folder')"
      src="@/assets/home/play-button_disable.svg"
    />
  </div>
  <EditFolder
    v-if="showEdit"
    :locale="locale"
    @close="showEdit = false"
    :folder="folder"
  />
  <ConfirmFolder
    v-if="showConfirm"
    :locale="locale"
    @close="showConfirm = false"
    @confirmed="removeFolder"
  />
</template>

<script>
import localizeFilter from "@/locale/locale";
import ConfirmFolder from "@/components/pop-ups/ConfirmPopUps/ConfirmFolder";
import EditFolder from "@/components/pop-ups/EditPopUps/EditFolder";

export default {
  name: "FolderCardHead",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
    cardsLength: {
      type: Number,
      default: 0,
    },
    showSettings: {
      type: Boolean,
      default: false,
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

  emits: ["showSettings", "removeFolder"],

  components: {
    ConfirmFolder,
    EditFolder,
  },

  data() {
    return {
      canReviewMessage: "",
      canReviewIconSrc: "",
      showConfirm: false,
      showEdit: false,
    };
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    showConfirmForm() {
      this.showConfirm = true;
      this.$emit("showSettings");
    },
    showEditForm() {
      this.showEdit = true;
      this.$emit("showSettings");
    },
    removeFolder() {
      this.showConfirm = false;
      this.$emit("removeFolder");
    },
  },
};
</script>

<style lang="sass" scoped>
.folder__head
  position: relative
  width: 100%
  height: 17%

  &::before
    content: ""
    position: absolute
    width: 100%
    height: 1px
    background: rgba(0, 0, 0, 0.1)
    left: 0%
    bottom: -15%

.folder__settings
  display: flex
  position: relative
  float: right
  flex-direction: column
  align-items: center

  height: 80%
  width: 1.6vw

  cursor: pointer
  z-index: 5

  .show-settings
    height: 17px
    width: 17px

.folder__review
  float: left
  height: 80%
  width: 1.6vw
  cursor: pointer

.settings-wrapper
  display: flex
  position: absolute
  flex-direction: column
  align-items: center

  min-width: 7vw
  height: auto
  top: 135%

  background: #fff
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

  border-radius: 5px
  padding: 1vh 0vw

  font-style: normal
  font-weight: normal
  font-size: 12px
  line-height: 16px

  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none
  -ms-user-select: none

  .setting
    display: flex
    flex-direction: row
    text-align: left
    align-items: center
    width: calc( 100% - 2vw )
    height: 3vh
    padding: 0.2vh 1vw

    &:hover
      background: darken(#fff, 3%)

.edit__icon,
.remove__icon
  margin-right: 0.5vw
  height: 75%
  width: 1.1vw

.remove__text
  color: #CE1010
</style>
