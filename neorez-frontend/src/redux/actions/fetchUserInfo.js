import axios from "axios";
import { setUserInfo } from "../userInfo";

export const handleGetUserInfo = (userId) => async (dispatch) => {
    const ApiUrl = import.meta.env.VITE_APP_BACKEND_API;

    try {
        const response = await axios.get(`${ApiUrl}/userInfo/${userId}`);
        // console.log("response.data", response.data);
        dispatch(setUserInfo(response.data));
    } catch (err) {
        console.log("error", err);
    }
};

