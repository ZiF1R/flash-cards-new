<template>
  <div class="overlay" @click.self="$emit('closeNav')">
    <nav>
      <div class="nav__logo"></div>
      <span class="nav__line"></span>
      <div class="nav__links">
        <div
          @click.left="activeLink = link"
          class="links__link"
          :class="{ link_active: activeLink === link }"
          v-for="(link, index) in links"
          :key="index"
        >
          <nav-link
            :locale="locale"
            :path="links[index].path"
            :link_id="links[index].id"
            :link_name="links[index].name"
            @click="$emit('closeNav')"
          />
        </div>
      </div>

      <div class="nav__footer">
        <a class="footer__help-btn" href="mailto:do-alex03@mail.ru">
          {{ localize("Contact with us") }}
        </a>
        <a target="blank" href="https://policies.google.com/privacy?hl=en-US">
          {{ localize("Privacy Policy") }}
        </a>
        <a target="blank" href="https://policies.google.com/terms?hl=en">
          {{ localize("Terms and Conditions") }}
        </a>
        <div class="footer__copyright">
          Copyright &copy; 2021, created by
          <a target="blank" href="https://vk.com/sashadobriyan">Z1FiR</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import NavLink from "@/components/static-components/nav/NavLink.vue";
import localizeFilter from "@/locale/locale";

export default {
  name: "Nav",

  components: {
    NavLink,
  },

  emits: ["closeNav"],

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  data() {
    return {
      links: [
        {
          id: "img1",
          name: "Profile",
          path: "profile",
          active: false,
        },
        {
          id: "img2",
          name: "Folders",
          path: "folders",
          active: false,
        },
        {
          id: "img3",
          name: "Settings",
          path: "settings",
          active: false,
        },
      ],
      activeLink: null,
    };
  },

  created() {
    if (localStorage.getItem("active-link-index"))
      this.links[+localStorage.getItem("active-link-index")].active = true;
    else this.links[0].active = true;

    this.activeLink = this.links.filter((el) => el.active)[0];
    this.$router.push(`/${this.activeLink.path}`);
  },

  methods: {
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },

  watch: {
    activeLink() {
      this.links.map((el, index) => {
        if (el.active && el !== this.activeLink) el.active = false;
        else if (el === this.activeLink) {
          el.active = true;
          localStorage.setItem("active-link-index", index);
        }
      });
    },
  },
};
</script>

<style lang="sass">
@import "@/sass/variables"

nav
  display: flex
  position: fixed
  flex-direction: column
  float: left
  z-index: 100

  height: calc( 100vh - 60px )
  width: calc( 20vw - 40px )
  min-width: 200px
  padding: 30px 20px
  padding-left: 0
  box-shadow: -3px 0 15px rgba(0, 0, 0, 0.2)
  background: var(#{--nav-background-default})

.overlay
  display: block
  background: unset
  position: fixed

  @media screen and (max-width: 901px)
    background: rgba(0, 0, 0, 0.3)
    z-index: 99
    top: 0
    bottom: 0
    right: 0
    left: 0

.nav__line
  display: block
  position: absolute
  content: ""

  height: 0%
  width: 0.5vw
  top: 0%
  left: 0%
  background: var(#{--primary-color})
  transition: top 0.21s ease-in-out, height 0.3s ease-in-out

.nav__logo
  display: flex
  justify-content: center
  align-items: center

  background-image: url('../../assets/home/Logo.svg')
  background-position: center left
  background-repeat: no-repeat
  background-size: contain

  width: calc( 100% - 20px )
  margin-left: 20px
  height: 6vh

.nav__links
  display: flex
  position: relative
  flex-direction: column
  justify-content: flex-start

  width: 100%
  height: auto
  padding-top: 6vh

.router-link
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-start

  padding-left: 30px
  width: calc(100% - 10px)
  height: 60px
  cursor: pointer
  margin-bottom: 0.5vh

.link__text
  display: flex
  align-items: center
  justify-content: flex-start

  font-style: normal
  font-weight: 200
  font-size: 1.25em
  line-height: 33px

.img1
  background-image: url('../../assets/home/profile.svg')

.img2
  background-image: url('../../assets/home/folder.svg')

.img3
  background-image: url('../../assets/home/settings.svg')

.link__img
  display: flex
  justify-content: center
  align-items: center

  background: var(#{--nav-icon-background-default})
  border-radius: 50%

  margin-right: 10px

  width: 45px
  height: 45px

  @media screen and (max-width: 1100px)
    width: 40px
    height: 40px

  .img
    width: 23px
    height: 23px
    background-position: center center
    background-repeat: no-repeat
    background-size: contain
    filter: opacity(27%)

    @media screen and (max-width: 1100px)
      width: 19px
      height: 19px

a
  text-decoration: none

.link_active
  position: relative
  .link__img
    background: var(#{--primary-color})

    .img
      filter: invert(1)

  .link__text
    font-weight: 400
    color: var(#{--primary-color})

    &::before
      display: block
      position: absolute
      content: ""

      height: 100%
      width: 6px
      left: 0%
      background: var(#{--primary-color})

      @media screen and (max-width: 501px)
        width: 5px

.nav__footer
  display: flex
  position: absolute
  flex-direction: column
  justify-content: flex-start

  width: calc( 20vw - 60px )
  min-width: 180px
  padding: 0 20px
  margin-bottom: 3vh
  bottom: 0

  font-style: normal
  font-weight: 300
  font-size: 0.875em
  line-height: 21px

  .footer__help-btn
    position: relative
    background: var(#{--primary-color})
    width: calc( 100% - 40px )
    align-self: center

    margin-bottom: 3vh
    padding: 10px 20px

    color: #fff
    text-align: center
    font-weight: normal
    font-size: 1.0625em
    line-height: 28px

    border-radius: 5px

    @media screen and (max-width: 1100px)
      width: calc( 100% - 4vw )
      padding: 1.5vh 2vw

    &:hover
      background: lighten($primary-color, 6%)

    &:active
      background-color: darken($primary-color, 5%)

  .footer__copyright,
  .footer__copyright *
    color: var(#{--text-color-opacity-default})

  .footer__copyright
    margin-top: 2.5vh
</style>
