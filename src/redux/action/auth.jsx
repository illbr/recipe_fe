import axios from "axios";

let url = import.meta.env.VITE_BASE_URL;
 export const login = (data,navigate) => async (dispatch) => {
    try { dispatch({type: "AUTH_LOGIN_PENDING"})
    console.log(data)
    const result = await axios.post(url + `users/login`, data)
    localStorage.setItem("token",result.data.token)
    localStorage.setItem("username",result.data.data[0].name);
    localStorage.setItem("photo",result.data.data[0].photo);
    localStorage.setItem("email",result.data.data[0].email);
    localStorage.setItem("id",result.data.data[0].id);
    dispatch({payload:result.data.data,type:"AUTH_LOGIN_SUCCESS"})
    navigate("/menu")
        
    } catch (error) {
        dispatch({payload:error.response.data.message,type:"AUTH_LOGIN_fAILED"})
        alert(error.response.data.message);
        
    }
 }