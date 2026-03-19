import { useDispatch } from "react-redux";
import { register, login, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister({username, email, password}) {
        try {
            dispatch(setLoading(true));
            const data = await register({username, email, password});
            return data;
            
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration Failed!"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({email, password}) {
        try {
            dispatch(setLoading(true));
            const data = await login({email, password});
            dispatch(setUser(data.user))
            return data;
            
        } catch (error) {
            console.log("ERROR RESPONSE:", error.response?.data);
            // Log the entire error response for debugging
            dispatch(setError(error.response?.data?.message || "Login Failed!"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user))
            
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Fetching User Failed!"));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return ({
        handleRegister,
        handleLogin,
        handleGetMe
    })
}
