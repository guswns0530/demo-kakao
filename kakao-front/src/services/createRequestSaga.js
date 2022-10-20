import { call, put } from 'redux-saga/effects'
import { startLoading, finishLoading} from "../modules/loading";

export default function createRequestSaga(type, request, callback = () => {}) {
    const SUCCESS = `${type}_SUCCESS`
    const FAILURE = `${type}_FAILURE`

    return function*(action) {
        yield put(startLoading(type))
        try {
            const response = yield call(request, action.payload)
            const data = response.data.data
            yield put({
                type: SUCCESS,
                payload: data
            })
            callback(data)
        } catch (e) {
            if(e.response) {
                yield put({
                    type: FAILURE,
                    payload: e.response.data['error_description'],
                    error: true
                })
            }
        }

        yield put(finishLoading(type))
    }
}