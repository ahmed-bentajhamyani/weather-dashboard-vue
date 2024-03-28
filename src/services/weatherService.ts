import axios from 'axios';

export default {
    URL: import.meta.env.VITE_API_ENDPOINT,
    GEO_URL: import.meta.env.VITE_API_GEO_ENDPOINT,
    API_KEY: import.meta.env.VITE_API_KEY,

    isItCity: async function (name: string) {
        return await axios.get(this.GEO_URL, {
            params: {
                q: name,
                limit: 1,
                appid: this.API_KEY,
            },
        });
    },

    getWeaderNow: async function (latitude: number, longitude: number) {
        return await axios.get(this.URL + 'weather', {
            params: {
                lat: latitude,
                lon: longitude,
                appid: this.API_KEY,
                units: 'metric'
            },
        });
    },

    getForecast: async function (latitude: number, longitude: number) {
        return await axios.get(this.URL + 'forecast', {
            params: {
                lat: latitude,
                lon: longitude,
                appid: this.API_KEY,
                units: 'metric'
            },
        });
    },

    getWeaderNowByCity: async function (city: string) {
        return await axios.get(this.URL + 'weather', {
            params: {
                q: city,
                appid: this.API_KEY,
                units: 'metric'
            },
        });
    },

    getForecastByCity: async function (city: string) {
        return await axios.get(this.URL + 'forecast', {
            params: {
                q: city,
                appid: this.API_KEY,
                units: 'metric'
            },
        });
    }
};
