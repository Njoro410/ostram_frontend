import { apiSlice } from "../../app/api/apiSlice";

export const authorizationSlices = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSpecificBranch: builder.query({
            query: (branch_id) => ({
                url: `/administration/specific_branch/${branch_id}/`,
                method: "GET",
            }),
        }),

        getAllBranches: builder.query({
            query: () => ({
                url: "/administration/all_branches/",
                method: "GET",
            }),
        }),

        createBranch: builder.mutation({
            query: (data) => ({
                url: "/administration/all_branches/",
                method: "POST",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        editBranch: builder.mutation({
            query: (data, branch_id) => ({
                url: `/administration/all_branches/${branch_id}`,
                method: "PUT",
                body: data,
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        getBranchStatus: builder.query({
            query: () => ({
                url: "/administration/branch_status/",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useLazyGetSpecificBranchQuery,
    useGetAllBranchesQuery,
    useCreateBranchMutation,
    useEditBranchMutation,
    useGetBranchStatusQuery
} = authorizationSlices;