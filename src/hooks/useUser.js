import { useGetUserQuery } from "../features/users/usersApiSlice"

const useUser = () => {
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUserQuery({ skip: true });
    return {
        user,isLoading,isSuccess,isError,error
    }
}

export default useUser

// import { useGetUserQuery } from "../features/users/usersApiSlice";
// import { useSelector } from 'react-redux';

// const useUser = () => {
//     // Get cached data from the Redux store
//     const cachedData = useSelector((state) => state.usersApi?.data);

//     const hasCachedData = cachedData !== undefined && cachedData !== null;


//     // Use the 'skip' parameter to conditionally skip the API request if there is cached data
//     const {
//         data: user,
//         isLoading,
//         isSuccess,
//         isError,
//         error,
//     } = useGetUserQuery(undefined, { skip: hasCachedData });

//     // If there is cached data, use it, otherwise use the fetched data
//     const finalUser = hasCachedData ? cachedData : user;

//     return {
//         user: finalUser,
//         isLoading,
//         isSuccess,
//         isError,
//         error,
//     };
// };

// export default useUser;
