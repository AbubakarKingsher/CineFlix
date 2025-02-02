import axios from "../../utils/axios"
import { loadTv } from "../Redusers/TvSlice"

export const tvApi = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`tv/${id}`)
        const recommendations = await axios.get(`tv/${id}/recommendations`)
        const similar = await axios.get(`tv/${id}/similar`)
        const video = await axios.get(`tv/${id}/videos`)
        const trailer = video.data.results.find(v => v.type === "Trailer")
        const externalIds = await axios.get(`tv/${id}/external_ids`)
        const watchProviders = await axios.get(`tv/${id}/watch/providers`)
        const allDetail = {
            detail: detail.data,
            recommendations: recommendations.data,
            similar: similar.data,
            video: video.data,
            externalIds: externalIds.data,
            watchProviders: watchProviders.data,
            trailer: trailer
        }
        dispatch(loadTv(allDetail))

    } catch (error) {
        console.log("ERROR: " + error);
    }
}