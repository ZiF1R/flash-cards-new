<template>
  <routes-temp @mouseover="anchorMarker">
    <template v-slot:page_head>
      <img src="@/assets/home/settingsIcon.svg" class="head__icon" />
      <div class="head__text">{{ localize("Settings") }}</div>
    </template>

    <template v-slot:page_filters>
      <div class="anchors">
        <span class="anchors-marker"></span>
        <a
          class="anchor"
          v-for="anchor in anchors"
          :key="anchor"
          :href="`settings#` + anchor"
          :class="{ anchor_active: anchor === activeAnchor }"
          @click.left="activateAnchor"
        >
          {{ localize(`${anchor}`) }}
        </a>
      </div>
    </template>

    <template v-slot:page_content>
      <div class="settings__content">
        <div class="block" v-for="(block, index) of blocks" :key="index">
          <setting-block :block="block" :locale="locale" />
        </div>
      </div>
    </template>
  </routes-temp>
</template>

<script>
import RoutesTemp from "@/components/RoutesTemp";
import SettingBlock from "@/components/SettingBlock";
import localizeFilter from "@/locale/locale";

export default {
  name: "Settings",

  props: {
    switchedTheme: Boolean,
    switchedReview: Boolean,
    timeLimit: Number,
    cardsLimit: Number,
    locale: String,
  },

  components: {
    RoutesTemp,
    SettingBlock,
  },

  data() {
    return {
      localCardsLimit: this.cardsLimit,
      localTimeLimit: this.timeLimit,
      activeAnchor: "General",
      anchors: ["General", "Review", "Other"],
      blocks: [
        {
          title: "General",
          settings: [
            {
              title: "App theme",
              description: "Switch the theme of the app",
              buttonType: "Switch",
            },
          ],
        },
        {
          title: "Review",
          settings: [
            {
              title: "Number of cards",
              description: "Choose number of cards you want to train",
              buttonType: "List",
              from: 5,
              delta: 5,
              to: 100,
            },
            {
              title: "Reversed review",
              description: "Show the card definition first in review",
              buttonType: "Switch",
            },
            {
              title: "Time limit",
              description:
                "Choose the amount of time that will be given to write an answer (in seconds; to remove the limit, select 0)",
              buttonType: "List",
              from: 0,
              delta: 5,
              to: 120,
            },
          ],
        },
        {
          title: "Other",
          settings: [
            {
              title: "Export cards",
              description:
                "Export cards from some folder to the file on your device",
              buttonType: "Button",
            },
            {
              title: "Import cards",
              description:
                "Import cards from file on your device to the folder",
              buttonType: "Button",
            },
          ],
        },
      ],
    };
  },

  methods: {
    anchorMarker() {
      const anchorLine = document.querySelector(".anchors-marker"),
        anchor = document.querySelectorAll(".anchor");
      let activeItem = document.querySelector(".anchor_active");

      anchorLine.style.width = `${activeItem.offsetWidth}px`;
      anchorLine.style.left = `${activeItem.offsetLeft}px`;

      anchor.forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          activeItem = document.querySelector(".anchor_active");
          anchorLine.style.width = `${e.currentTarget.offsetWidth}px`;
          anchorLine.style.left = `${e.currentTarget.offsetLeft}px`;
        });

        el.addEventListener("mouseleave", () => {
          activeItem = document.querySelector(".anchor_active");
          anchorLine.style.width = `${activeItem.offsetWidth}px`;
          anchorLine.style.left = `${activeItem.offsetLeft}px`;
        });
      });
    },
    activateAnchor(e) {
      let active = document.querySelector(".anchor_active");
      active.classList.remove("anchor_active");
      e.target.classList.add("anchor_active");

      this.activeAnchor = e.target.innerHTML;
    },
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
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
    font-style: normal
    font-weight: normal
    font-size: 1.875em
    line-height: 46px

.anchors
  display: flex
  position: relative
  flex-direction: row
  align-items: center

  font-style: normal
  font-weight: normal
  font-size: 1.0625em
  line-height: 24px
  width: 27%
  margin-top: 4vh
  padding-bottom: 1.5vh

  .anchor
    margin-right: 2vw
    height: 100%
    cursor: pointer

  .anchors-marker
    display: block
    position: absolute
    content: ""
    height: 0.5vh
    width: 0px
    bottom: -5%
    left: 0%
    background: #00A3FF
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out

  .anchor_active
    color: #00A3FF

.settings__content
  margin-left: 30px
  margin-top: 5vh

  .block
      display: flex
      flex-direction: column
      margin-bottom: 3vh
</style>
