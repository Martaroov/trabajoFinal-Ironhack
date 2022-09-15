<template>
  <header class="headerclass">
    <nav>
      <div class="flex-nav"></div>
      <ul>
        <img class="logo-img" src="../assets/images/logo-check.png" alt="logo check"/>
        <li><router-link to="/">Home</router-link></li>
       <!-- <li><router-link to="/register">Register</router-link></li>
        <li><router-link to="/login">Login</router-link></li>-->
        <li class="logout"><button @click="logOut" class="">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { useUserStore } from "../store/user";

export default {
  setup() {
    const userStore = useUserStore();
    //get user from store
    //Setup ref to router
    //Logout function
    return { userStore };
  },
  methods: {
    logOut() {
      this.userStore.logOut();
    },
  },
};
</script>

<style>
.headerclass {
  background-color: whitesmoke;
}

.flex-nav {
  display: flex;
  align-items: center;
}

.logo-img {
  width: 3em;
  padding-top: 15px;
  padding-left: 10px;
  padding-bottom: 15px;
}

.nav {
  padding: 10%;
  margin: 5px;
}

ul {
  color: aliceblue;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color:rgba(19, 35, 47, 0.9);
}

.logout{
    color: whitesmoke;
    background-color: rgb(146, 123, 197);
    border: 10px solid rgb(146, 123, 197);
    border-radius: 5px;
    cursor: pointer;
   
    }
    
.logout:hover {
    background-color: rgb(255, 192, 31);
    border: 10px solid rgb(255, 192, 31);
     }

</style>