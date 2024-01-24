import Cookies from "js-cookie";

export const setLocaUser = (data) => {
    Cookies.set("token", data.token);
    // Cookies.set("user_id", data.user_id);
    // Cookies.set("username", data.username);
    // Cookies.set("email", data.email);
}

export const removeLocalUser = () => {
    // ['token', 'user_id', 'username', 'email'].forEach(cookieName => { Cookies.remove(cookieName) })
    Cookies.remove('token')
}