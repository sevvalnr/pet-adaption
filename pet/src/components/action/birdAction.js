import { fetchBirds } from "../api";
import { FETCH_BIRDS } from "./types";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';


export const fetchBirdsAction = () => async (
    dispatch
) => {
    const res = await fetchBirds(
        apiBaseUrl,
    );
    console.log(res,"act")
    if (res)
        dispatch({
            type: FETCH_BIRDS,
            payload: res,
        });
};