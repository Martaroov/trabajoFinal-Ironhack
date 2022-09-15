<template>
  <div class="background">
    <div class="login">
      <form action class="form" @submit.prevent="register">
        <h2 class="title2">Sign up</h2>
        <h1 class="title1">Wellcome to this page</h1>
        <label class="form-label" for="#email">Email:</label>
        <input
          v-model="email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        />
        <label class="form-label" for="#password">Password:</label>
        <input
          v-model="password"
          class="form-input"
          type="password"
          id="password"
          placeholder="Password"
        />
        <label class="form-label" for="#password-repeat"
          >Repeat password:</label
        >
        <input
          v-model="passwordRepeat"
          class="form-input"
          type="password"
          id="password-repeat"
          placeholder="Password"
        />
        <br />
        <p v-if="error">{{ msg }}</p>
        <div class="errbox">
          <p class="err">Already have an account?</p>
          <p @click="$emit('toggle')" class="err2">Login</p>
          <!-- Redirigir a login.vue -->
        </div>
        <input class="form-submit" type="submit" value="Sign Up" />
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../store/user";

export default {
  name: "register",
  setup() {
    const user = useUserStore();

    return { user };
  },
  data: () => ({
    email: "",
    password: "",
    passwordRepeat: "",
    error: false,
    msg: "",
  }),
  methods: {
    async register() {
      if (this.password === this.passwordRepeat) {
        const res = await this.user.signUp(this.email, this.password);
        if (res.status === 400) {
          this.error = true;
          this.msg = res.message;
        } else {
          this.error = true;
          this.msg = res.message;
        }
      } else {
        this.error = true;
        this.msg = "Passwords don't match";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background-image: url("../assets/images/background.jpg.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.login {
  margin-right: 800px;
  color: rgba(19, 35, 47, 0.9);
  padding: 2rem;
}

form {
  color: rgba(19, 35, 47, 0.9);
}
.title1 {
  text-align: center;
  padding-bottom: 8%;
  font-size: 15px;
  font-weight: 200;
}

.title2 {
  text-align: center;
  font-size: 35px;
  font-weight: 600;
}
.err {
  color: rgba(19, 35, 47, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
.err2 {
  display: flex;
  align-items: center;
  margin-left: 6px;
  justify-content: center;
  color: rgb(146, 123, 197);
}

.errbox {
  display: flex;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: whitesmoke;
  opacity: 0.8;
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid rgba(19, 35, 47, 0.9);
  border-radius: 10px;
  color: rgba(19, 35, 47, 0.9);
  &:focus {
    outline: 0;
    border-color: #4776e6;
  }
}
.form-submit {
  background-color: rgb(146, 123, 197);
  margin: 10px;
  transition: 0.5s;
  background-size: 200% auto;
  border-radius: 10px;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background-color: rgb(255, 192, 31);
    text-decoration: none;
  }
}
</style>