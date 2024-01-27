import Cookies from "js-cookie";

export const setLocaUser = (data) => {
    Cookies.set("token", data.token, { expires: 1 });
}

export const removeLocalUser = () => {
    Cookies.remove('token')
}