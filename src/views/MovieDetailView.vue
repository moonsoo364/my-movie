<script setup lang="ts">
import type { Movie } from '@/api/tmdb/types/movie';
import type { PropType } from 'vue';

const props = defineProps({
    movie: {
        type: Object as PropType<Movie>,
        required: true,
    }
})
</script>

<template>
    <h1>Movie Detail View</h1>
</template>