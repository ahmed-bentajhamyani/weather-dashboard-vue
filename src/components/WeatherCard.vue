<script setup lang="ts">
import { onMounted, ref } from 'vue';
import weatherService from '../services/weatherService';
import { WeatherResponse } from '../types/weatherResponse';
import dateNowFunction from '../utils/dateNowFunction';

const props = defineProps<{
    latitude?: number
    longitude?: number
    city?: string
}>()

const weather = ref<WeatherResponse | null>(null);
const dateNow = ref<string | null>(null);

const getWeather = async () => {
    if (props.latitude && props.longitude) {
        try {
            const res = await weatherService.getWeaderNow(props.latitude, props.longitude);
            if (res?.data) {
                weather.value = res.data;
            }
        } catch (error) {
            console.log('error', error);
        }
    }
};

const getWeatherByCity = async () => {
    if (props.city) {
        try {
            const res = await weatherService.getWeaderNowByCity(props.city);
            if (res?.data) {
                weather.value = res.data;
            }
        } catch (error) {
            console.log('error', error);
        }
    }
};

onMounted(() => {
    dateNow.value = dateNowFunction();
    if (props.latitude && props.longitude) getWeather();
    else if (props.city) getWeatherByCity();
})
</script>

<template>
    <main class="col-span-3 xl:col-span-2 flex flex-wrap">
        <div class="w-full px-2">
            <div v-if="weather"
                class="bg-gray-900 text-white border border-gray-700 relative min-w-0 break-words rounded-3xl overflow-hidden shadow-sm w-full">
                <div class="px-6 py-6 relative">
                    <div class="flex justify-between items-center">
                        <div class="bg-white rounded-full px-3 py-2 w-fit">
                            <h5 class="text-black mb-0 font-medium text-xs">{{ weather?.name }}, {{
                weather?.sys?.country }}</h5>
                        </div>
                        <h6 class="mb-0 font-light">{{ dateNow }}</h6>
                    </div>
                    <div class='flex justify-start items-center space-x-4 mt-4'>
                        <img class="scale-125"
                            :src="`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`"
                            alt={weather?.data.weather[0].description} />
                        <p class='mb-0 text-2xl text-white/70'>{{ weather?.weather[0].description }}</p>
                    </div>
                    <h3 class="font-bold text-9xl text-center mb-0"><span>{{ Math.round(weather?.main.temp)
                            }}&deg;</span></h3>
                    <div class="grid grid-cols-3 place-items-center gap-5 mt-8 mb-4">
                        <div class="text-center">
                            <h3 class="font-bold text-3xl mb-0">{{ Math.round(weather?.main.humidity) }}<span
                                    class='font-normal text-sm'>%</span></h3>
                            <p class='text-sm text-white/70'>Humidity</p>
                        </div>

                        <div class="text-center">
                            <h3 class="font-bold text-3xl mb-0">{{ weather?.wind.speed.toFixed(1) }}<span
                                    class='font-normal text-sm'>km/h</span></h3>
                            <p class='text-sm text-white/70'>Wind speed</p>
                        </div>

                        <div class="text-center">
                            <h3 class="font-bold text-3xl mb-0">{{ Math.round(weather?.main.temp_max) }}&deg;<span
                                    class="font-normal text-base">/{{ Math.round(weather?.main.temp_min) }}&deg;</span>
                            </h3>
                            <p class='text-sm text-white/70'>Max / Min</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="mx-4 my-8">City not found</div>
        </div>
    </main>
</template>