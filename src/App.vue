<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <!-- <span >
            <img class="icon-img" src="@/assets/img/app/movie.png" alt="icon-movie" />
            <RouterLink class="page-title" to="/">My Movie</RouterLink>
        </span> -->
        <RouterLink class="route" to="/">Movie</RouterLink>
        <RouterLink class="route" to="/boxoffice">Boxoffice</RouterLink>
        <RouterLink class="route" to="/company">Company</RouterLink>
        <RouterLink class="route" to="/person">Person</RouterLink>
        <!-- <img class="icon-img" src="@/assets/img/app/hamburger.png" alt="icon-hamberger" /> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.icon-wrapper{
  display: flex;
  justify-content: flex-end;
}
.icon-img{
  width: 36px;
}
.route {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem; /* rem 단위로 설정 */
}

:global(body) {
  margin: 0;
  padding: 0;
  background-color: #f4f6f8;
  color: #1e2a38;
  font-family: 'Noto Sans', sans-serif; /* 기본 폰트 변경 (선택사항) */
  font-size: 16px; /* rem 기준 값 */
}

.wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* 모바일 대응 */
  gap: 1rem;
  background-color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 0.625rem; /* 10px -> rem 변환 */
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.05); /* 2px 4px */
  font-size: 0.875rem; /* 14px */
}

/* 반응형: 화면이 600px 이하일 경우 세로 정렬 */
@media (max-width: 600px) {
  nav {
    flex-direction: column;
    align-items: stretch;
  }

  .route {
    display: none;
    text-align: center;
    width: 100%;
  }
}

nav a {
  color: #3b5998;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem; /* 6px */
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
