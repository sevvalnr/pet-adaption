import { fetchDogs } from "../api";
import { FETCH_DOGS } from "./types";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';


export const fetchDogsAction = () => async (
    dispatch
) => {
    const res = await fetchDogs(
        apiBaseUrl,
    );
    console.log(res,"act")
    if (res)
        dispatch({
            type: FETCH_DOGS,
            payload: res,
        });
};