// GET PROFILE API
import axios from "axios"

export const get_profile = async (action) => {
    return axios.get("http://localhost:3002/posts").then((res) => {
        const data = res.data
        const status = res.status
        console.log(res);
        return {
            data,
            status
        }
    }).catch((err) => {
        console.log(err);
    })
}