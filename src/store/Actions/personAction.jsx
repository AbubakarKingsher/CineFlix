import axios from "../../utils/axios";
import { loadPerson } from "../Redusers/PersonSlice";

export const personApi = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`person/${id}`)
        const movieCredits = await axios.get(`person/${id}/movie_credits`)

        const allDetail = {
            detail: detail.data,
            movieCredits: movieCredits.data,
        }

        dispatch(loadPerson(allDetail));

    } catch (error) {
        console.log("ERROR: " + error);
    }
}