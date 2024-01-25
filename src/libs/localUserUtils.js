import Cookies from "js-cookie";

export const setLocaUser = (data) => {
    Cookies.set("token", data.token);
}

export const removeLocalUser = () => {
    Cookies.remove('token')
}