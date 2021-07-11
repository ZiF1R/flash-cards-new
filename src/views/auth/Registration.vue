<template>
  <auth-temp>
    <template v-slot:auth__header>
      <h2 class="auth-text">{{ localize("Registration") }}</h2>
    </template>
    <template v-slot:auth__fields>
      <div
        class="auth-btn login__auth-btn"
        v-for="(input, index) in fields"
        :key="index"
      >
        <input
          autocomplete="off"
          class="input"
          :class="{ password: input.content === 'Password' }"
          :placeholder="localize(`${input.content}`)"
          v-model.trim="registrationData[input.model]"
          maxlength="30"
          :type="input.type"
        />
        <div
          v-if="input.content === 'Password'"
          class="icons pass"
          style="cursor: pointer"
          @click.left="showPass"
        >
          <img class="active hide" src="@/assets/profile/eye.svg" />
          <img class="show" src="@/assets/profile/invisible.svg" />
        </div>
      </div>
    </template>
    <template v-slot:auth__link>
      {{ localize("Already have an account") }}?
      <router-link class="to-login" to="/login">
        {{ localize("Login") }}!
      </router-link>
    </template>
    <template v-slot:auth__finish>
      <button type="submit" class="finish" @click.left.prevent="registrate">
        {{ localize("Login") }}
      </button>
    </template>
    <template v-slot:auth__error>
      <div v-if="errorMessage" class="err-data">
        {{ errorMessage }}
      </div>
    </template>
  </auth-temp>
</template>

<script>
import AuthTemp from "@/components/Auth";
import localizeFilter from "@/locale/locale";
import { _db } from "@/db.js";

export default {
  name: "Registration",

  components: {
    AuthTemp,
  },

  props: {
    locale: {
      type: String,
      default: "EN",
    },
  },

  data() {
    return {
      errorMessage: "",
      registrationData: {
        Last_name: "",
        Name: "",
        Nickname: "",
        Email: "",
        Password: "",
        Confirm_password: "",
      },
      fields: [
        {
          content: "Nickname",
          model: "Nickname",
          type: "text",
        },
        {
          content: "Last name",
          model: "Last_name",
          type: "text",
        },
        {
          content: "Name",
          model: "Name",
          type: "text",
        },
        {
          content: "Email",
          model: "Email",
          type: "email",
        },
        {
          content: "Password",
          model: "Password",
          type: "password",
        },
        {
          content: "Confirm password",
          model: "Confirm_password",
          type: "password",
        },
      ],
    };
  },

  //todo!: vuelidate

  methods: {
    async registrate() {
      if (!this.validateData()) {
        this.errorMessage = "Please, fill empty fields!";
        return 0;
      } else if (!this.confirmPassword()) {
        this.errorMessage = "Passwords must be equal!";
        return 0;
      }
      this.errorMessage = "";

      let answer = await _db.signUp(this.registrationData);
      if (typeof answer === "string") this.errorMessage = answer;
      else this.$router.push("/login");
    },
    validateData() {
      return (
        this.registrationData.last_name !== "" &&
        this.registrationData.name !== "" &&
        this.registrationData.nickname !== "" &&
        this.registrationData.email !== "" &&
        this.registrationData.password !== ""
      );
    },
    confirmPassword() {
      return (
        this.registrationData.password ===
        this.registrationData.confirm_password
      );
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
    localize(frase) {
      return localizeFilter[this.locale][frase] || frase;
    },
  },
};
</script>
