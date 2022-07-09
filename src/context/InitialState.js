import { fetchCartItems, fetchUserData } from "../utils/FetchLoacalStorageData";

const userInfo = fetchUserData();
const cartInfo = fetchCartItems();

export const initialState =
{
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
};
