import { apiSlice } from "../../app/api/apiSlice";

export const todoSlices = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserTodo: builder.query({
            query: () => ({
                url: "/todos/get_user_todos/",
                method: "GET",
            }),
        }),

        getUserAssignedTodo: builder.query({
            query: () => ({
                url: "/todos/user_assigned_todos/",
                method: "GET",
            }),
        }),

        getPublicTodos: builder.query({
            query: () => ({
                url: `/todos/public_todos/`,
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

        getTodoStatus: builder.query({
            query: () => ({
                url: `/todos/todo_status/`,
                method: "GET",
            }),
        }),

        getTodoPriority: builder.query({
            query: () => ({
                url: `/todos/todo_priority/`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useLazyGetUserTodoQuery,
    useLazyGetUserAssignedTodoQuery,
    useLazyGetPublicTodosQuery,
    useAddTodoMutation,
    useGetTodoStatusQuery,
    useGetTodoPriorityQuery,
} = todoSlices;
