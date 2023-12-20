export const auth = (res, next) => {
    if (window !== "undefined") {
        sessionStorage.setItem("token", console.log(res.data.token));
        sessionStorage.setItem("user", console.log(res.data.user_email));
    }
    next();
}