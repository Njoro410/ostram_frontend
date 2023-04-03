import { useLogoutMutation } from "../features/auth/logoutApiSlice";
import { logOut } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../app/store";

const useLogout = () => {
    const [logout, { isSuccess }] = useLogoutMutation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // persistor.purge()
        
        logout()
        dispatch(logOut());
        
    }
    // console.log(isSuccess)
    // if(isSuccess) {
    //     dispatch(logOut());

    // }

    return handleLogout;
}

export default useLogout