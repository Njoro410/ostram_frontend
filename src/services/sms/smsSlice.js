import { apiSlice } from "../../app/api/apiSlice";

const smsSlices = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        sendSingleSms: builder.mutation({
            query: (data) => ({
                url: `/sms/send_single_sms/`,
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        sendMultipleSms: builder.mutation({
            query: (data) => ({
                url: `/sms/send_multiple_sms/`,
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        broadcastSms: builder.mutation({
            query: (data) => ({
                url: `/sms/broadcast/`,
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const {
    useSendSingleSmsMutation,
    useSendMultipleSmsMutation,
    useBroadcastSmsMutation
} = smsSlices;
