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
  margin-bottom: 2vh

.profile__content
  display: flex
  position: relative
  flex-direction: column
  margin-top: 5vh
  margin-right: 20px

.head__icon
    height: 100%
    width: 40px
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
  min-width: 120px
  width: 19vw
  max-width: 300px
  padding-left: 18px

  font-style: normal
  font-weight: 300
  font-size: 1.1875em
  line-height: 28px

  border: none
  outline: none

  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)

  @media screen and (max-width: 601px)
    padding-left: 14px
    width: 35vw

.input-wrapper
  position: relative
  height: 45px
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
    width: 30px
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
    width: 4px
    height: 100%
    z-index: 2

    background: #00A3FF

.names
  display: flex
  flex-direction: row

  > div:first-child
    margin-right: 20px

  @media screen and (max-width: 401px)
    flex-direction: column

    > div:first-child
      margin-right: 0

.btns
  display: flex
  margin-top: 3vh

  @media screen and (max-width: 401px)
    flex-direction: column

.btn
  font-style: normal
  font-weight: normal
  font-size: 1em
  line-height: 28px

  border-radius: 5px
  padding: 8px 25px

  cursor: pointer
  color: #fff
  background: none
  border: none
  outline: none

.create
  background-color: #00A3FF
  margin-right: 50px

  &:hover
    background-color: lighten(#00A3FF, 5%)

  &:active
    background-color: darken(#00A3FF, 5%)

.cancel
  display: flex
  justify-content: center
  align-items: center
  background-color: #DA2929

  &:hover
    background-color: lighten(#DA2929, 5%)

  &:active
    background-color: darken(#DA2929, 5%)

.logout-icon
  margin-left: 7px
  filter: invert(1)
  width: 20px
  height: 20px

@media screen and (max-width: 901px) and (min-width: 401px)
  .input-wrapper
    height: 40px

  .input
    font-size: 1.1em
    width: 35vw
    max-width: 250px

  .head__icon
    width: 30px

  .create
    margin-right: 25px

  .names
    margin-right: 10px

  .input-wrapper::before
    width: 3px

@media screen and (max-width: 400px)
  .profile__content, .names
    align-items: center

  .btn
    width: 90vw

  .create
    margin-bottom: 20px

  .create
    margin-right: 0

  .head__icon
    width: 30px

  .input
    width: 85vw
</style>
