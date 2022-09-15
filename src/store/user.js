// /store/user.js

import { defineStore } from "pinia";
import { supabase } from "../supabase";
import router from "../router"

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        return {
          status: 200,
          message: 'Registro correcto'
        }
      } catch (error) {
        console.log(error);
        return {
          status: 400,
          message: error.message
        }
      }
      // if (user) this.user = user;
    },
    // Hacer sign in
    async signIn(email, password) {
      try {
        const { user, session, error } = await supabase.auth.signIn({
          email: email,
          password: password,
        });
        this.user = user;
        if(error) throw error;
        router.push('/');
        return {
          status: 200,
          message: 'Login correcto'
        }
      } catch(error) {
        return error;
      }
      
    },

    // Hacer log out
    async logOut() {
      try{
        const { error } = await supabase.auth.signOut();
        router.push('/auth');
      }
      catch (error) {
        console.log ('Log out again')
      }

    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: "user",
          storage: localStorage,
        },
      ],
    },
  },
});
