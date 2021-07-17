<template>
  <div class="card__head">
    <div class="card__settings" @click="$emit(`showSettings`)">
      <img class="settings__icon" src="@/assets/home/settings_folder.svg" />
      <div v-if="activeSettings" class="settings-wrapper">
        <div class="setting" v-for="setting in settings" :key="setting.text">
          <CardSetting
            :locale="locale"
            :icon="setting.icon"
            :text="setting.text"
            @tap="setting.func.call(this)"
          />
        </div>
        <!-- <div class="setting" @click.left="copyExamples(card.examples)">
          <div class="copy__icon"></div>
          <div class="copy__text">
            {{ localize("Copy examples") }}
          </div>
        </div> -->
      </div>
    </div>
  </div>
  <div v-if="copiedToClipboard" class="pop-up">
    {{ localize(`The ${copiedPart} has been copied to the clipboard`) }}.
  </div>
</template>

<script>
import localizeFilter from "@/locale/locale";
import CardSetting from "@/components/card-components/CardSetting";

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
  },

  data() {
    return {
      copiedToClipboard: false,
      copiedPart: "",
      settings: [
        {
          text: "Edit",
          icon: "edit",
          func: () => {
            alert(this.card.term);
          },
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
        },
      ],
    };
  },

  emits: ["showSettings"],

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },

  watch: {
    copiedPart() {
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
  font-size: 12px
  line-height: 16px

  z-index: 10
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
  display: flex
  position: fixed
  flex-direction: column
  justify-content: center
  align-items: center
  background: #e9e9e9

  font-style: normal
  font-weight: 300
  font-size: 16px
  line-height: 16px

  padding: 2vh 3.5vw
  bottom: 5%
  left: 43%
  z-index: 20
</style>
