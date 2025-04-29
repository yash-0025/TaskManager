import api from "../../api/index";

import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "./actionTypes";
import {toast} from "react-toastify";


export const postLoginData = (email, password, ) => {
    return async(dispatch) => {
        try{
            dispatch({ type: LOGIN_REQUEST});
            const { data } = await api.post('/auth/login', {email, password});

          

            dispatch({
                type:LOGIN_SUCCESS,
                // payload: data,
                payload: {
                    token: data.token
                }
            });
            localStorage.setItem('token', data.token);
            // dispatch(saveProfile(data.token));
            // const savedToken = localStorage.getItem("token");
            // console.log(savedToken);
            toast.success(data.msg);
            // return data;

        } catch(error) {
            const msg = error.response?.data?.msg || error.message;
            dispatch({
                type: LOGIN_FAILURE,
                payload: {msg}
            })
            toast.error(msg);
        }
    }
}


export const saveProfile = (token) => async(dispatch) => {
    try {
        const { data } = await api.get('/profile', {
            headers: {Authorization: token}
        });
        dispatch({
            type: SAVE_PROFILE,
            payload: {user: data.user, token},
        });
    } catch(error) {
        toast.error("Profile not able to be saved!");
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({type: LOGOUT});
    document.location.href = '/';
}