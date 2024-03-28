<script setup lang="ts">
import { onMounted, ref } from 'vue';
import weatherService from '../services/weatherService';
import { ForecastResponse } from '../types/forecastResponse';
import formatDateFunction from '../utils/formatDateFunction';
import ForecastCard from './ForecastCard.vue';

const props = defineProps<{
    latitude?: number
    longitude?: number
    city?: string
}>()

const forecasts = ref<ForecastResponse[]>([]);

const getForecast = async () => {
    if (props.latitude && props.longitude) {
        try {
            const res = await weatherService.getForecast(props.latitude, props.longitude);
            if (res?.data.list) {
                const filteredForecast = [];
                for (let i = 0; i < res.data.list.length; i += 8) {
                    filteredForecast.push(res.data.list[i]);
                }
                forecasts.value = filteredForecast;
            }
        } catch (error) {
            console.log('error', error);
        }
    }
};

const getForecastByCity = async () => {
    if (props.city) {
        try {
            const res = await weatherService.getForecastByCity(props.city);
            if (res?.data.list) {
                const filteredForecast = [];
                for (let i = 0; i < res.data.list.length; i += 8) {
                    filteredForecast.push(res.data.list[i]);
                }
                forecasts.value = filteredForecast;
            }
        } catch (error) {
            console.log('error', error);
        }
    }
};

onMounted(() => {
    if (props.latitude && props.longitude) getForecast();
    else if (props.city) getForecastByCity();
})
</script>

<template>
    <aside v-if="forecasts" class="col-span-3 xl:col-span-4 flex flex-wrap">
        <div class="w-full px-2">
            <div
                class="bg-gray-900 text-white border border-gray-700 relative min-w-0 break-words rounded-3xl overflow-hidden shadow-sm mb-4 w-full">
                <div class="px-6 py-6 relative">
                    <h1 class='font-bold text-3xl uppercase'>Forecasts</h1>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center gap-4 mt-5">
                        <ForecastCard v-for="(forecast, index) in forecasts" :key="index" :forecast="forecast"
                            :date="formatDateFunction(forecast.dt_txt)" />
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>