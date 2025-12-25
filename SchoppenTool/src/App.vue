<template>
  <div class="app-layout">
    <header class="main-header">
      <div class="logo">Schoppen</div>
      <nav v-if="!isLoginPage">
        <router-link to="/">Home</router-link>
        <router-link to="/tool1">Tool 1</router-link>
        <router-link to="/tool2">Tool 2</router-link>
        <button @click="logout" class="logout-btn">Logout</button>
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

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #333;
    color: white;
    padding: 10px;
  }

  .main-header a {
    color: white;
    text-decoration: none;
    margin-right: 15px;
    font-weight: bold;
  }

  .main-header a.router-link-active {
    color: #42b983; /* Farbe für den aktiven Link */
  }

  .main-footer {
    background-color: #f1f1f1;
    text-align: center;
    padding: 10px;
    border-top: 1px solid #ccc;
  }

  .logout-btn {
    background: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
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