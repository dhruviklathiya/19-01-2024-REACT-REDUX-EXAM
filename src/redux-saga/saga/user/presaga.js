import { takeLatest } from "redux-saga/effects";
import { GET_PROFILE_PROCESS } from "../../user/action";
import { get_profile_controller } from "./manageprofile";

// GET - product saga
export function* get_profile_saga() {
    yield takeLatest(GET_PROFILE_PROCESS, get_profile_controller);
}