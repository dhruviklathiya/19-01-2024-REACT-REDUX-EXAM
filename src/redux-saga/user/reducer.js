import { GET_PROFILE_ERROR, GET_PROFILE_PROCESS, GET_PROFILE_SUCCESS } from "./action";

const initialState = {
    profile_data: [],
    isLoading: false,
    isError: null,
};


export const profile_reducer = (state = initialState, action) => {
    //   console.log(action, "Data from reducer");
    switch (action.type) {
        case GET_PROFILE_PROCESS: {
            const data = action.data
            return {
                data,
                ...state
            }
        }
        case GET_PROFILE_SUCCESS: {
            const profile_data = action.data
            return {
                profile_data
            }
        }
        case GET_PROFILE_ERROR: {
            const data = action.data
            return {
                data,
            }
        }
        default:
            return ({
                name: "profile"
            })
            break;
    }
}