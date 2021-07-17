<template>
  <auth-temp>
    <template v-slot:auth__header>
      <h2 class="auth-text">{{ localize("Login") }}</h2>
    </template>
    <template v-slot:auth__fields>
      <div
        class="auth-btn login__auth-btn"
        v-for="(input, index) in fields"
        :key="index"
      >
        <input
          autocomplete="off"
          :placeholder="localize(`${input.content}`)"
          :type="input.type"
          class="input"
          :class="{ password: input.content === 'Password' }"
          v-model.trim="loginData[input.model]"
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
      {{ localize("Have no account") }}?
      <router-link class="to-login" to="/registration"
        >{{ localize("Sign Up") }}!
      </router-link>
    </template>
    <template v-slot:auth__finish>
      <button class="finish" @click.left.prevent="signIn">
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
import AuthTemp from "@/components/AuthTemp";
import localizeFilter from "@/locale/locale";
import { mapActions } from "vuex";

export default {
  name: "Login",

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
      loginData: {
        email: "",
        password: "",
      },
      fields: [
        {
          content: "Email",
          model: "email",
          type: "email",
        },
        {
          content: "Password",
          model: "password",
          type: "password",
        },
      ],
    };
  },

  //todo!: vuelidate

  methods: {
    ...mapActions(["login"]),
    async signIn() {
      let answer = await this.login(this.loginData);
      if (typeof answer === "string") {
        this.errorMessage = answer;
        return 0;
      }
      this.errorMessage = "";
      this.$router.push("/profile");
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
