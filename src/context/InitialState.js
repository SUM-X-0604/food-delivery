import { fetchUserData } from "../utils/FetchLoacalStorageData";

const userInfo = fetchUserData()


export const initialState =
{
    user: userInfo,
    foodItems: null
};
