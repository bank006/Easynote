<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Topbar from './components/Topbar/Topbar.vue';

const route = useRoute();
const showNavbar = ref([]); // แสดง Navbar บนทุกหน้ายกเว้นหน้า Login

watch(() => {
  showNavbar.value = route.name !== 'Login' && route.name !== 'Register';

});
</script>

<template>
  <div id="app">
    <div class="settopbar" :class="{'hidden' : !showNavbar}">
      <Topbar v-if="showNavbar" />
    </div>
    <div class="bodyset">
      <router-view />
    </div>
  </div>
</template>
<style>
#app{
  height: 100vh;
  overflow: hidden;
  width: 100%;
}

.settopbar{
  height: 10%;
}
.settopbar.hidden{
  display: none;
}

</style>

