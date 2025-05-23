<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import  {type CreditQuery} from '@/api/tmdb/types/query/queryCredits'
import { searchCredits } from '@/api/tmdb/tmdb';
import type { CastMember } from '@/api/tmdb/types/credits';

const route = useRoute();
const movieId = ref<number> ();
movieId.value = Number(route.query.id);
const castMembers = ref<CastMember[]>([]);

const createCreditQuery = (): CreditQuery => {
    return {
        movieId: movieId.value || 0,
        language: 'ko-KR' // 필요하다면 언어 옵션 추가
    };
};

const fetchCredits = async (creaditQuery: CreditQuery) => {
    try {
        const res = await searchCredits(creaditQuery);
        console.log(res);
        
        castMembers.value = res.data.cast;
    } catch (error) {
        console.error('Failed to fetch credits:', error);
    }
}

onMounted(() => {
    if (movieId) {
        fetchCredits(createCreditQuery());
    } else {
        console.error('No movie id found in query string');
    }
});
</script>

<template>
  <h1>Movie Detail View</h1>
  
  <ul v-if="castMembers.length > 0">
    <li v-for="cast in castMembers" :key="cast.id" class="cast-member">
      <img
        v-if="cast.profile_path"
        :src="`https://image.tmdb.org/t/p/w92${cast.profile_path}`"
        :alt="cast.name"
        class="cast-photo"
      />
      <div>
        <strong>{{ cast.name }}</strong>
        <p>as {{ cast.character }}</p>
      </div>
    </li>
  </ul>

  <p v-else>No cast information available.</p>
</template>

<style scoped>
.cast-member {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.cast-photo {
  border-radius: 4px;
  width: 60px;
  height: 90px;
  object-fit: cover;
}
</style>
