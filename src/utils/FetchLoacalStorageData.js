export const fetchUserData = () => {
    const userInfo =
        localStorage.getItem("user") !== "undefined" ? JSON.parse(localStorage.getItem("user")) : localStorage.clear();
    return userInfo;
};

export const fetchCartItems = () => {
    const cartInfo =
        localStorage.getItem("cartItem") !== "undefined" ? JSON.parse(localStorage.getItem("cartItem")) : localStorage.clear();
    return cartInfo ? cartInfo : [];
};