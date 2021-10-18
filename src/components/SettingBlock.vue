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
          v-if="setting.buttonType === `List`"
          :active="setting.active"
          :from="setting.from"
          :to="setting.to"
          :delta="setting.delta"
          @selectOption="selectOpt($event, setting.property)"
        />
        <Switch
          v-if="setting.buttonType === `Switch`"
          :switched="setting.switched"
          @switchChanged="switchChanged($event, setting)"
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
import { mapActions } from "vuex";

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
    ...mapActions(["selectOption", "changeSwitch"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    selectOpt(selectedItem, property) {
      this.selectOption({
        selectedItem,
        block: this.block.title.toLowerCase(),
        property,
      });
    },
    switchChanged({ switchState }, setting) {
      setting.switched = switchState;
      this.changeSwitch({
        switchState,
        block: this.block.title.toLowerCase(),
        property: setting.property,
      });
    },
  },
};
</script>

<style lang="sass" scoped>
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

    @media screen and (max-width: 601px)
      justify-content: space-between

.setting__text
    width: 25vw
    font-style: normal

    @media screen and (max-width: 901px)
      width: 43vw

    @media screen and (max-width: 601px)
      width: fit-content

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
    margin-left: 30px
    display: flex
    justify-content: center
    align-items: center
</style>
