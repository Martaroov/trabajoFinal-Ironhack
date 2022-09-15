<template>
  <Login v-if="isLogin" @toggle="isLogin = !isLogin" />
  <Register v-else @toggle="isLogin = !isLogin" />
</template>

<script>
import Login from './Login.vue';
import Register from './Register.vue';
export default {
    data() {
        return {
            isLogin: true
        };
    },
    components: { Login, Register }
}
</script>

<style>

</style>