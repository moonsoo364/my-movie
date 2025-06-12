<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { searchGitRepos } from '@/api/back/back';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const repoName = ref<string>(route.query.repo as string || '')
const respData = ref<Array<Record<string, string>>>([])

watch(()=> route.query.repo, (newRepo) =>{
  console.log(newRepo);
  repoName.value = (newRepo as string) || ''
})
onMounted(()=>{
  if(repoName.value){
    search(repoName.value);
  }
})
const search = async (repo: string) => {
  try {
    const res = await searchGitRepos(repo);
    console.log(res);
    
    router.replace({query : {repo}});
    respData.value = res.data ?? [];
  } catch (err) {
    console.log(err);
    respData.value = [];
  }
};
const reset = () => {
  repoName.value = '';
  respData.value = [];
};
</script>

<template>
  <main class="center-container">
    <h2>api 테스트</h2>
    <div class="input-wrapper">
      리포지터리를 입력해주세요. :
      <input
        type="text"
        v-model="repoName"
        class="center-input"
        @keyup.enter="search(repoName)"
      />
      <button @click="search(repoName)" @keyup="" class="center-button">조회 하기</button>
      <button @click="reset" class="center-button">초기화</button>
    </div>

    <!-- 테이블 출력 -->
    <div v-if="respData.length > 0" style="margin-top: 30px; width: 80%; max-width: 900px;">
      <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>이름</th>
            <th>전체 이름</th>
            <th>설명</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(repo, idx) in respData" :key="idx">
            <td>{{ repo.name || '값이 없습니다' }}</td>
            <td>{{ repo.full_name || '값이 없습니다' }}</td>
            <td>{{ repo.description || '값이 없습니다' }}</td>
            <td>
              <a :href="repo.html_url" target="_blank" rel="noopener noreferrer">
                {{ repo.html_url || '값이 없습니다' }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else style="margin-top: 30px; color: #666;">
      검색 결과가 없습니다.
    </div>
  </main>
</template>

<style scoped>
/* 기존 스타일 유지 */
.center-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.input-wrapper {
  margin-top: 20px;
}

/* input 스타일 */
.center-input {
  font-size: 1.2rem;
  padding: 8px 12px;
  margin-left: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: white;
  color: black;
  box-sizing: border-box;
  display: inline-block;
  width: 300px;
}

/* 버튼 스타일 */
.center-button {
  font-size: 1.1rem;
  padding: 8px 16px;
  margin-left: 12px;
  border: none;
  border-radius: 4px;
  background-color: #4a90e2;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.center-button:hover {
  background-color: #357ABD;
}

.center-button:active {
  background-color: #2c5aa0;
}

.center-button:focus {
  outline: 2px solid #357ABD;
  outline-offset: 2px;
}

/* 테이블 스타일 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

thead {
  background-color: #4a90e2;
  color: white;
}

thead th {
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #357ABD;
}

tbody td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  vertical-align: top;
}

tbody tr:hover {
  background-color: #f0f8ff;
}

a {
  color: #4a90e2;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
