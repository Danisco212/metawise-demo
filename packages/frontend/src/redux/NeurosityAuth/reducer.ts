import { NEUROSITY_LOGIN_FAILURE, NEUROSITY_LOGIN_REQUEST, NEUROSITY_LOGIN_SUCCESS } from "./actionTypes"

const initialState = {
    loading: false,
    authData: null,
    error: '' 
}
export type ReducerType = {
    type: string
    payload: any
}
export const neurosityReducer = (state = initialState, action: ReducerType) => {
    switch (action.type){
        default:
            return state
        case NEUROSITY_LOGIN_REQUEST:
            return Object.assign({}, state, {
                loading: true
            })
        case NEUROSITY_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                authData: action.payload,
            })
        case NEUROSITY_LOGIN_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload
            })
    }
}