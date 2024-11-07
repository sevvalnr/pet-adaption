import { fetchOther } from "../api";
import {FETCH_OTHERS } from "./types";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';


export const fetchOthersAction = () => async (
    dispatch
) => {
    const res = await fetchOther(
        apiBaseUrl,
    );
    console.log(res,"act")
    if (res)
        dispatch({
            type: FETCH_OTHERS,
            payload: res,
        });
};