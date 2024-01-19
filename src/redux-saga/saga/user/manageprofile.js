
import { call, put } from "redux-saga/effects";
import { get_profile } from "../../user/api";
import { GET_PROFILE_ERROR, GET_PROFILE_SUCCESS } from "../../user/action";

export function* get_profile_controller(action) {
    try {
        const res = yield call(get_profile, action)
        const status = res.status
        const data = res.data
        if (status === 200 || status === 201) {
            yield put({ type: GET_PROFILE_SUCCESS, data })
        }
        else {
            yield put({ type: GET_PROFILE_ERROR, data })
        }
    } catch (error) {
        console.log("Error in controller")
    }
}