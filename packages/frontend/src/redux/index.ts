import { combineReducers } from "redux";
import { neurosityReducer } from "./NeurosityAuth/reducer";

export const rootReducer = combineReducers({
    neurosityAuth: neurosityReducer
})