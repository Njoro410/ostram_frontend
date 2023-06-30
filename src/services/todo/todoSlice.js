import { apiSlice } from "../../app/api/apiSlice";

export const todoSlices = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserTodo: builder.query({
            query: (user_id) => ({
                url: `/todos/get_user_todos/${user_id}/`,
                method: "GET",
            }),
        }),
        addTodo: builder.mutation({
            query: (data) => ({
                url: `/todos/create_todo/`,
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),
    }),
});

export const { useLazyGetUserTodoQuery, useAddTodoMutation } = todoSlices;
