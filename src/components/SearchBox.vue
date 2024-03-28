<script setup lang="ts">
import ForecastsCard from './ForecastsCard.vue';
import WeatherCard from './WeatherCard.vue';

const props = defineProps<{
    searchResult: string
}>()
</script>

<template>
    <section v-if="props.searchResult" class='rounded-3xl bg-black text-white w-full border border-gray-700 z-10 mt-3'>
        <div v-if="props.searchResult.length >= 1" class='grid lg:grid-cols-6 gap-y-5 p-3'>
            <WeatherCard :city="searchResult" />
            <ForecastsCard :city="searchResult" />
        </div>
        <div v-else class='mx-4 my-8'>Please enter the full name of a city.</div>
    </section>
</template>