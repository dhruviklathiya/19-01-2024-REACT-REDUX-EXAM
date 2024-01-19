import { all } from "redux-saga/effects";
import { get_profile_saga } from "./user/presaga";

export function* rootSaga() {
    yield all([get_profile_saga()]);
}
