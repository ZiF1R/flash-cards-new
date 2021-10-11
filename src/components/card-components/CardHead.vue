<template>
  <div class="card__head">
    <div class="card__settings">
      <img
        class="settings__icon"
        src="@/assets/home/settings_folder.svg"
        @click="$emit(`showSettings`)"
      />
      <div
        v-if="activeSettings"
        class="settings-wrapper"
        @click="$emit('showSettings')"
      >
        <CardSetting
          v-for="setting in settings"
          :key="setting.text"
          :locale="locale"
          :icon="setting.icon"
          :text="setting.text"
          @tap="setting.func.call(this)"
        />
      </div>
    </div>
  </div>
  <div v-if="copiedToClipboard" class="pop-up">
    {{ localize(`The ${copiedPart} has been copied to the clipboard`) }}.
  </div>
  <EditCard
    v-if="openEdit"
    :locale="locale"
    :card="card"
    @close="openEdit = false"
  />
  <Confirm
    v-if="showConfirm"
    :locale="locale"
    @close="showConfirm = false"
    @confirmed="removeCard"
  >
    <template v-slot:confirm__message>
      {{
        localize(
          "After deleting the card, it will be impossible to restore the data! Are you sure about this"
        )
      }}
    </template>
    <template v-slot:confirm-button__text>
      {{ localize("Remove") }}
    </template>
  </Confirm>
</template>

<script>
import localizeFilter from "@/locale/locale";
import CardSetting from "@/components/card-components/CardSetting";
import EditCard from "@/components/pop-ups/EditPopUps/EditCard";
import Confirm from "@/components/pop-ups/ConfirmPopUps/Confirm";

export default {
  name: "CardHead",

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

  components: {
    CardSetting,
    EditCard,
    Confirm,
  },

  emits: ["showSettings", "removeCard"],

  data() {
    return {
      showConfirm: false,
      openEdit: false,
      copiedToClipboard: false,
      copiedPart: "",
      settings: [
        {
          text: "Edit",
          icon: "edit",
          func: () => (this.openEdit = true),
        },
        {
          text: "Copy all",
          icon: "copy",
          func: () => {
            window.navigator.clipboard.writeText([
              // eslint-disable-next-line
              [this.card.term, this.card.definition, this.card.examples].join(" / ")
            ]);
            this.copiedPart = "card";
          },
        },
        {
          text: "Copy term",
          icon: "copy",
          func: () => {
            window.navigator.clipboard.writeText(this.card.term);
            this.copiedPart = "term";
          },
        },
        {
          text: "Copy definition",
          icon: "copy",
          func: () => {
            window.navigator.clipboard.writeText(this.card.definition);
            this.copiedPart = "definition";
          },
        },
        {
          text: "Copy examples",
          icon: "copy",
          func: () => {
            window.navigator.clipboard.writeText(this.card.examples);
            this.copiedPart = "examples";
          },
        },
        {
          text: "Remove",
          icon: "remove",
          func: () => (this.showConfirm = true),
        },
      ],
    };
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    removeCard() {
      this.showConfirm = false;
      this.$emit("removeCard");
    },
  },

  watch: {
    copiedPart() {
      this.copiedToClipboard = true;
      setTimeout(() => (this.copiedToClipboard = false), 3000);
    },
  },
};
</script>

<style lang="sass" scoped>
.card__head
  position: relative
  width: 100%
  height: 20px

  &::before
    content: ""
    position: absolute
    width: 100%
    height: 1px
    background: rgba(0, 0, 0, 0.1)
    left: 0%
    bottom: -15%

.settings-wrapper
  display: flex
  position: absolute
  flex-direction: column
  align-items: center

  min-width: 7vw
  height: auto

  background: #fff
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1)

  border-radius: 5px
  margin-top: 3vh
  padding: 1vh 0vw

  font-style: normal
  font-weight: normal
  font-size: 0.75em
  line-height: 16px

  z-index: 10
  user-select: none
  -moz-user-select: -moz-none
  -webkit-user-select: none
  -ms-user-select: none

.settings__icon
  margin-right: 0.5vw
  width: 17px
  height: 17px

.card__settings
  display: flex
  position: relative
  flex-direction: column
  align-items: center
  justify-content: space-between

  height: 80%
  min-width: 1.5vw

  white-space: nowrap
  cursor: pointer
  float: right

.setting
  &:active
    background-color: darken(#f9f9f9, 5%)

.copy__icon
  margin-right: 0.5vw
  height: 75%
  width: 1.1vw

.pop-up
  align-self: center
  position: fixed

  padding: 15px 30px
  bottom: 5%
  left: 43%

  font-style: normal
  font-weight: 300
  font-size: 1em
  line-height: 16px

  background: #e9e9e9
  z-index: 20

  @media screen and  (max-width: 901px)
    left: 25%

  @media screen and  (max-width: 501px)
    left: 0
    width: calc(100% - 60px)
    text-align: center
</style>
