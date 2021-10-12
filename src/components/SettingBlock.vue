<template>
  <div :id="block.title" class="block__title">
    {{ localize(`${block.title}`) }}
    <img src="@/assets/settings/link.svg" class="block__link" />
  </div>
  <div class="block__settings" v-if="block?.settings">
    <div
      class="block__setting"
      v-for="(setting, index) of block.settings"
      :key="index"
    >
      <div class="setting__text">
        <div class="setting__title">
          {{ localize(`${setting.title}`) }}
        </div>
        <div class="setting__description">
          {{ localize(`${setting.description}`) }}
        </div>
      </div>
      <div class="setting__action">
        <Button v-if="setting.buttonType === `Button`" />
        <List
          :titleList="setting.title"
          :currentTimeLimit="localTimeLimit"
          :currentCardsLimit="localCardsLimit"
          :from="setting.from"
          :to="setting.to"
          :delta="setting.delta"
          v-if="setting.buttonType === `List`"
          @selectOption="selectOption($event, setting.title)"
        />
        <Switch
          :titleList="setting.title"
          :switchedReview="switchedReview"
          :switchedTheme="switchedTheme"
          @switchChanged="switchChanged(setting.title)"
          v-if="setting.buttonType === `Switch`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/buttons/Button";
import List from "@/components/buttons/List";
import Switch from "@/components/buttons/Switch";
import localizeFilter from "@/locale/locale";

export default {
  name: "SettingBlock",

  components: {
    Button,
    List,
    Switch,
  },

  props: {
    locale: String,
    block: Object,
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    selectOption(number, listTitle) {
      this.$emit("select_Option", { number, listTitle });
    },
    switchChanged(settingTitle) {
      this.$emit("switch_Changed", settingTitle);
    },
  },
};
</script>

<style lang="sass">
.block__settings
    display: flex
    flex-direction: column

.block__title
    display: flex
    width: fit-content
    position: relative
    font-style: normal
    font-weight: normal
    font-size: 1.0625em
    line-height: 24px
    margin-bottom: 2vh
    color: #00A3FF
    cursor: pointer

    &:hover .block__link
        display: block

.block__link
    display: none
    position: absolute
    width: 13px
    height: 13px
    top: calc( 50% - 15px/2 )
    left: -2vw

.block__setting
    display: flex
    flex-direction: row
    margin-bottom: 2vh

.setting__text
    width: 25vw
    font-style: normal

.setting__title
    font-size: 1.0625em
    font-weight: 400
    line-height: 24px

.setting__description
    line-height: 20px
    font-weight: 300
    font-size: 0.9375em
    color: rgba(0, 0, 0, 0.6)

.setting__action
    margin-left: 3vw
    display: flex
    justify-content: center
    align-items: center
</style>
