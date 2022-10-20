import { call, put } from 'redux-saga/effects'
import { startLoading, finishLoading} from "../modules/loading";

export default function createRequestSaga(type, request, callback = () => {}) {
    const SUCCESS = `${type}_SUCCESS`
    const FAILURE = `${type}_FAILURE`

    return function*(action) {
        const uuid = Math.random() * 100
        yield put(startLoading(type))
        console.log('startLoading', uuid)
        try {
            const response = yield call(request, action.payload)
            console.log(response)
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

        console.log('finishiLoading', uuid)
        yield put(finishLoading(type))
    }
}