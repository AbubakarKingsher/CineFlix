import axios from "../../utils/axios"
import { loadMovie } from "../Redusers/MovieSlice"



export const movieApi = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`movie/${id}`)
        const recommendations = await axios.get(`movie/${id}/recommendations`)
        const similar = await axios.get(`movie/${id}/similar`)
        const video = await axios.get(`movie/${id}/videos`)
        const trailer = video.data.results.find(v => v.type === "Trailer")
        const externalIds = await axios.get(`movie/${id}/external_ids`)
        const watchProviders = await axios.get(`movie/${id}/watch/providers`)
        const allDetail = {
            detail: detail.data,
            recommendations: recommendations.data,
            similar: similar.data,
            video: video.data,
            externalIds: externalIds.data,
            watchProviders: watchProviders.data,
            trailer: trailer
        }
        dispatch(loadMovie(allDetail))

    } catch (error) {
        console.log("ERROR: " + error);
    }
}



