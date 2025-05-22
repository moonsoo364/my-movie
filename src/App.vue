<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/boxoffice">Boxoffice</RouterLink>
        <RouterLink to="/company">Company</RouterLink>
        <RouterLink to="/person">Person</RouterLink>
      </nav>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>


:global(body) {
  margin: 0;
  padding: 0;
  background-color: #f4f6f8;
  color: #1e2a38;
  font-family: sans-serif;
}

.wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  background-color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-size: 14px;
}

nav a {
  color: #3b5998;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
  background-color: #e1ecf4;
  color: #1e6ba1;
}

nav a.router-link-exact-active {
  background-color: #e1ecf4;
  color: #0d253f;
}


</style>
