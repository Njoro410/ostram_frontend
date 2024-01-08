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
        user, userIsLoading: isLoading, isSuccess, isError, error
    }
}

export default useUser


