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
import { mapGetters, mapActions } from "vuex";
import FileServer from "file-saver";

export default {
  name: "Settings",

  props: {
    locale: String,
  },

  components: {
    RoutesTemp,
    SettingBlock,
  },

  data() {
    return {
      activeAnchor: "General",
      anchors: ["General", "Review", "Other"],
      blocks: [
        {
          title: "General",
          settings: [
            {
              title: "App theme",
              description: "Switch the theme of the app",
              buttonClass: "Switch",
              switched: this.isThemeSwitched(),
              property: "switchTheme",
            },
          ],
        },
        {
          title: "Review",
          settings: [
            {
              title: "Number of cards",
              description: "Choose number of cards you want to train",
              buttonClass: "List",
              from: 5,
              delta: 5,
              to: 100,
              active: this.getCardsLimit(),
              property: "cardsLimit",
            },
            {
              title: "Reversed review",
              description: "Show the card definition first in review",
              buttonClass: "Switch",
              switched: this.isReviewSwitched(),
              property: "switched",
            },
            {
              title: "Time limit",
              description:
                "Choose the amount of time that will be given to write an answer (in seconds; to remove the limit, select 0)",
              buttonClass: "List",
              from: 0,
              delta: 5,
              to: 120,
              active: this.getTimeLimit(),
              property: "timeLimit",
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
              buttonClass: "Button",
              handler: () => {
                this.$router.push("/folders?export-cards=true");

                setTimeout(() => {
                  let foldersToExport =
                    document.querySelectorAll(".folder.export");

                  foldersToExport.forEach((folder) => {
                    folder.addEventListener("click", (e) => {
                      let pressedFolder = e.path.filter((el) =>
                        el?.classList?.contains("folder")
                      )[0];
                      let folderName =
                        pressedFolder.querySelector(".folder__name").innerHTML;

                      this.findFolderByName(folderName).then((folder) => {
                        var blob = new Blob(
                          [JSON.stringify(folder.cards, null, 2)],
                          {
                            type: "text/plain;charset=utf-8",
                          }
                        );
                        FileServer.saveAs(blob, `${folderName}.json`);
                      });
                      this.$router.push("/settings");
                    });
                  });
                }, 30);
              },
            },
            {
              title: "Import cards",
              description:
                "Import cards from file on your device to the folder",
              buttonClass: "Button",
              buttonType: "file",
              handler: (input) => {
                let reader = new FileReader();
                reader.readAsText(input.target?.files[0]);

                let file;
                reader.onload = () => {
                  file = JSON.parse(reader.result)?.map(
                    (card) =>
                      (card = {
                        ...card,
                        created: new Date().toUTCString(),
                        memorized: false,
                        review: {
                          right: 0,
                          wrong: 0,
                        },
                      })
                  );
                  // console.log(file);

                  this.$router.push("/folders?import-cards=true");
                  setTimeout(() => {
                    let foldersToImport =
                      document.querySelectorAll(".folder.export");

                    foldersToImport.forEach((folder) => {
                      folder.addEventListener("click", (e) => {
                        let pressedFolder = e.path.filter((el) =>
                          el?.classList?.contains("folder")
                        )[0];
                        let folderName =
                          pressedFolder.querySelector(
                            ".folder__name"
                          ).innerHTML;

                        this.findFolderByName(folderName).then(
                          async (folder) => {
                            let result = [];

                            file.forEach((importCard) => {
                              let isNew = true;
                              // eslint-disable-next-line prettier/prettier
                              for (let i = 0; i < (folder?.cards?.length + 1); i++)
                                if (importCard.term === folder?.cards[i]?.term)
                                  isNew = false;
                              isNew && result.push(importCard);
                            });
                            result = {
                              cards: [...folder.cards, ...result],
                              data: { ...folder.data },
                            };
                            await this.addCards(result);
                          }
                        );
                        this.$router.push("/settings");
                      });
                    });
                  }, 30);
                };
                reader.onerror = () => console.log(reader.error);
              },
            },
          ],
        },
      ],
    };
  },

  methods: {
    ...mapActions(["findFolderByName", "addCards"]),
    ...mapGetters([
      "getTimeLimit",
      "getCardsLimit",
      "isReviewSwitched",
      "isThemeSwitched",
    ]),
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

  computed: {
    theme() {
      return this.isThemeSwitched();
    },
  },

  watch: {
    theme: {
      handler(newVal) {
        let themeName;

        // if theme is switched
        if (newVal) themeName = "dark";
        else themeName = "light";

        let rootStyles = document.querySelector(":root");
        let variables = [
          "body-background",
          "card-background",
          "text-color",
          "text-color-opacity",
          "option-hover-background",
          "nav-background",
          "nav-icon-background",
          "nav-icon-color",
          "icon-color",
        ];

        variables.forEach((variable) => {
          rootStyles.style.setProperty(
            `--${variable}-default`,
            `var(--${variable}-${themeName})`
          );
        });
      },
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

  width: fit-content
  margin-top: 4vh
  padding-bottom: 1.5vh

  .anchor
    margin-right: 15px
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
    background: var(#{--primary-color})
    transition: left 0.3s ease-in-out, width 0.3s ease-in-out

  .anchor_active
    color: var(#{--primary-color})

.settings__content
  margin-left: 30px
  margin-top: 5vh

  @media screen and (max-width: 501px)
    margin-left: 0px

  .block
      display: flex
      flex-direction: column
      margin-bottom: 3vh
      margin-right: 20px
</style>
