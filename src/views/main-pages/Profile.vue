<template>
  <routes-temp>
    <template v-slot:page_head>
      <img src="@/assets/home/profileIcon.svg" class="head__icon" />
      <div class="head__text">{{ localize("Profile") }}</div>
    </template>
    <template v-slot:space>
      <div class="space"></div>
    </template>
    <template v-slot:page_content>
      <div class="profile__content">
        <div class="input-wrapper">
          <input
            class="input"
            type="text"
            :title="localize(`Nickname`)"
            :placeholder="localize(`Nickname`)"
            v-model="localUser.Nickname"
          />
          <div class="icons" :title="localize(`You can change this field`)">
            <img src="@/assets/profile/edit.svg" />
          </div>
        </div>
        <div class="names">
          <div class="input-wrapper">
            <input
              class="input"
              type="text"
              :title="localize(`Last name`)"
              :placeholder="localize(`Last name`)"
              v-model="localUser.Last_name"
            />
            <div class="icons" :title="localize(`You can change this field`)">
              <img src="@/assets/profile/edit.svg" />
            </div>
          </div>
          <div class="input-wrapper">
            <input
              class="input"
              type="text"
              :title="localize(`Name`)"
              :placeholder="localize(`Name`)"
              v-model="localUser.Name"
            />
            <div class="icons" :title="localize(`You can change this field`)">
              <img src="@/assets/profile/edit.svg" />
            </div>
          </div>
        </div>
        <div class="input-wrapper">
          <input
            class="input"
            type="email"
            :title="localize(`Email`)"
            :placeholder="localize(`Email`)"
            v-model="localUser.Email"
            readonly
          />
          <div class="icons" :title="localize(`You cannot change this field`)">
            <img src="@/assets/profile/lock.svg" />
          </div>
        </div>
        <div class="input-wrapper">
          <input
            class="input password"
            type="password"
            :title="localize(`Password`)"
            :placeholder="localize(`Password`)"
            v-model="localUser.Password"
            readonly
          />
          <div
            class="icons pass"
            :title="localize(passTitle)"
            style="cursor: pointer"
            @click.left="showPass"
          >
            <img class="show" src="@/assets/profile/eye.svg" />
            <img class="active hide" src="@/assets/profile/invisible.svg" />
          </div>
        </div>
        <div class="btns">
          <button class="create btn" @click.left="saveChanges">
            {{ localize("Save") }}
          </button>
          <button @click.left="logOut" class="cancel btn">
            {{ localize("Log out") }}
            <img class="logout-icon" src="@/assets/profile/logout.svg" />
          </button>
        </div>
      </div>
    </template>
  </routes-temp>
</template>

<script>
import localizeFilter from "@/locale/locale";
import RoutesTemp from "@/components/RoutesTemp";

import { _db } from "@/db.js";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  components: {
    RoutesTemp,
  },

  data() {
    return {
      passTitle: "Show password",
      localUser: {},
    };
  },

  created() {
    this.localUser = JSON.parse(JSON.stringify(this.getUser()));
  },

  methods: {
    ...mapGetters(["getUser"]),
    ...mapActions(["sendUserData"]),
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
    async logOut() {
      await _db.logout();
      this.$router.push("/login");
    },
    async saveChanges() {
      if (
        this.localUser.Name &&
        this.localUser.Last_name &&
        this.localUser.Nickname
      )
        await this.sendUserData(this.localUser);
    },
    showPass() {
      const markers = document.querySelector(".pass");
      for (let i = 0; i < markers.childElementCount; i++)
        markers.children[i].classList.toggle("active");

      if (document.querySelector(".show.active")) {
        document.querySelector(".input.password").type = "text";
        this.passTitle = "Hide password";
      } else {
        document.querySelector(".input.password").type = "password";
        this.passTitle = "Show password";
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.space
  margin-bottom: 5vh

.profile__content
  display: flex
  position: relative
  flex-direction: column
  margin-top: 5vh

.head__icon
    height: 100%
    width: 3.5vw
    margin-right: 1vw

.head__text
    margin-top: 1vh
    font-style: normal
    font-weight: normal
    font-size: 1.875em
    line-height: 46px

.input
  position: relative
  height: 100%
  min-width: 17vw
  max-width: 25vw
  padding-left: 2vw

  font-style: normal
  font-weight: 300
  font-size: 1.1875em
  line-height: 28px

  border: none
  outline: none

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)

.input-wrapper
  position: relative
  height: 5.5vh
  margin-bottom: 3vh
  width: fit-content

  &:hover .icons > img
    display: block

  &:hover .icons.pass > img:not([class*="active"])
    display: none

  .icons
    display: flex
    justify-content: center
    align-items: center
    position: absolute
    right: 0%
    top: 0%
    height: 100%
    width: 3vw
    background: #fff

    & *
      display: none
      width: 20px
      height: 20px

  &::before
    display: block
    position: absolute
    content: ""

    left: 0%
    top: 0%
    width: 0.4vw
    height: 100%
    z-index: 2

    background: #00A3FF

.names
  display: flex
  flex-direction: row
  width: 65%
  justify-content: space-between

.btns
  display: flex
  justify-content: space-between
  min-width: 30%
  width: 42%
  max-width: 60%
  margin-top: 3vh

.btn
  font-style: normal
  font-weight: normal
  font-size: 1em
  line-height: 28px

  border-radius: 5px
  padding: 1.3vh 3vw

  cursor: pointer
  color: #fff
  background: none
  border: none
  outline: none

.create
  background-color: #00A3FF

  &:hover
    background-color: lighten(#00A3FF, 5%)

  &:active
    background-color: darken(#00A3FF, 5%)


.cancel
  padding-left: 3.5vw
  display: flex
  justify-content: center
  align-items: center
  background-color: #DA2929

  &:hover
    background-color: lighten(#DA2929, 5%)

  &:active
    background-color: darken(#DA2929, 5%)

.logout-icon
  margin-left: 0.5vw
  filter: invert(1)
  width: 22px
  height: 22px
</style>
