<script lang="ts">
export default {
    props: {
        forecast: {
            type: Object,
            required: true
        },
        date: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <article
        class="flex flex-col justify-between items-center bg-black text-white border border-gray-700 relative min-w-0 break-words rounded-3xl overflow-hidden shadow-sm mb-4 p-3 w-full">
        <h5 class="mb-0 font-medium text-xl text-white/70">{{ date.date }} <span class="mb-0 font-normal text-sm">{{
            date.month }}, {{ date.day }}</span></h5>
        <div class='flex flex-col justify-center items-center'>
            <img :src="`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`"
                :alt="forecast.weather[0].description" class="h-20" />
        </div>
        <div class="text-center">
            <h5 class="mb-0 font-medium text-4xl">{{ Math.round(forecast.main.temp_max) }}&deg;<span
                    class="mb-0 font-normal text-base">/ {{ Math.round(forecast.main.temp_min) }}&deg;</span></h5>
            <p class='text-sm text-white/70'>{{ forecast.weather[0].description }}</p>
        </div>
    </article>
</template>