import { fetchCats } from "../api";
import { FETCH_CATS } from "./types";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';


export const fetchCatsAction = () => async (
    dispatch
) => {
    const res = await fetchCats(
        apiBaseUrl,
    );
    console.log(res,"act")
    if (res)
        dispatch({
            type: FETCH_CATS,
            payload: res,
        });
};