<template>
  <div class="app-layout">
    <header class="main-header">
      <div class="logo">Schoppen</div>
      <nav v-if="!isLoginPage">
        <router-link to="/">Home</router-link>
        <router-link to="/freizeiten">Freizeiten</router-link>
        <router-link to="/teilnehmer">Teilnehmer</router-link>
        <router-link to="/zimmerplan">Zimmerplaner</router-link>
        <button v-if="localStorage.getItem('token')" @click="logout" class="btn-logout">Logout</button>
        <router-link v-if="!localStorage.getItem('token')" to="/login">Login</router-link>
      </nav>
    </header>
    <main class="content">
      <RouterView />
    </main>
    <footer class="main-footer">
      &copy; 2025 Freizeithaus Schoppen & Jonathan Hörstrup - Alle Rechte vorbehalten
    </footer>
  </div>
</template>

<style scoped>
  .app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  .content {
    flex: 1;
    padding: 20px;
  }


</style>

<script setup>
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.push('/login');
  }

  const isLoginPage = computed(() => route.path === '/login');
</script>