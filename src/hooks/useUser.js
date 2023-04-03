import { useGetUserQuery } from "../features/users/usersApiSlice"

const useUser = () => {
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUserQuery();
    return {
        user,isLoading,isSuccess,isError,error
    }
}

export default useUser