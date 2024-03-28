<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, watch } from 'vue';
import SearchBox from '../components/SearchBox.vue';
import WeatherCard from '../components/WeatherCard.vue';
import ForecastsCard from '../components/ForecastsCard.vue';

export default defineComponent({
    components: {
        WeatherCard,
        ForecastsCard,
        SearchBox
    },
    setup() {
        const latitude = ref<number | null>(null);
        const longitude = ref<number | null>(null);
        const error = ref<string | null>(null);
        const city = ref<string>('');
        const closeButton = ref<boolean>(false);
        const searchResult = ref<any>(null);
        const searchBoxOpen = ref<boolean>(false);
        const searchBoxRef = ref<HTMLDivElement | null>(null);

        const onSubmit = () => {
            searchBoxOpen.value = true;
        };

        watch(city, async (newValue) => {
            if (newValue == '') {
                searchBoxOpen.value = false;
                closeButton.value = false;
            } else {
                closeButton.value = true;
            }
        })

        const handleClickOutside = (event: MouseEvent) => {
            if (searchBoxRef.value && !searchBoxRef.value.contains(event.target as Node)) {
                searchBoxOpen.value = false;
                city.value = '';
            }
        };

        const closeSearchBox = () => {
            searchBoxOpen.value = false;
            city.value = '';
        };

        const success = (position: GeolocationPosition) => {
            latitude.value = position.coords.latitude;
            longitude.value = position.coords.longitude;
        };

        const failed = () => {
            error.value = 'Unable to retrieve your location';
        };

        onMounted(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, failed);
            } else {
                console.log("Geolocation not supported");
            }
        });

        watch(searchBoxOpen, async (newSearchBoxOpen) => {
            if (newSearchBoxOpen) {
                document.addEventListener('click', handleClickOutside);
            }
        })

        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        })

        return {
            latitude,
            longitude,
            error,
            city,
            closeButton,
            searchResult,
            searchBoxOpen,
            searchBoxRef,
            onSubmit,
            closeSearchBox
        };
    }
});
</script>

<template>
    <section class="mx-auto p-5 md:p-12">
        <header ref="searchBoxRef" class="relative my-5">
            <form @submit.prevent="onSubmit"
                class="flex justify-center items-center bg-gray-900 text-white border border-gray-700 rounded-full px-3 py-2.5 w-full md:w-2/3 lg:w-1/3">
                <label htmlFor="city" className='opacity-50'>
                    <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2"
                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>
                </label>
                <input type="text" v-model="city" class="appearance-none bg-gray-900 px-2 outline-none w-full"
                    placeholder="Search city" />
                <div v-if="closeButton" class="opacity-50 cursor-pointer" @click="closeSearchBox">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                        viewBox="0,0,256,256">
                        <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                            stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                            font-family="none" font-weight="none" font-size="none" text-anchor="none"
                            style="mix-blend-mode: normal">
                            <g transform="scale(5.12,5.12)">
                                <path
                                    d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z">
                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
            </form>

            <SearchBox v-if="searchBoxOpen" :searchResult="city" @close="closeSearchBox" />
        </header>

        <div v-if="latitude && longitude && !searchBoxOpen" class="grid md:grid-cols-6 gap-y-5">
            <WeatherCard :latitude="latitude" :longitude="longitude" />
            <ForecastsCard :latitude="latitude" :longitude="longitude" />
        </div>
        <div v-else-if="!searchBoxOpen" class="flex justify-center items-center mt-60">
            <h2 class="font-medium text-xl md:text-2xl text-white text-center">{{ error }}</h2>
        </div>
    </section>
</template>