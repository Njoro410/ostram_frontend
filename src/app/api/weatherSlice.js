import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const weatherApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.weatherapi.com/v1',
    }),
    endpoints: (builder) => ({
        getWeatherData: builder.query({
            query: (location) => `forecast.json?key=a26b971a3ce4494fa92163339232305&q=${location}&days=1&aqi=no&alerts=no`,
            staleTime: 2 * 60 * 60 * 1000, 
            refetchOnMountOrArgChange: true,
        }),
    }),
});

export const { useGetWeatherDataQuery } = weatherApi;

export default weatherApi;
