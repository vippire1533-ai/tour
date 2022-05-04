import { createStore, combineReducers,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {tourlistreducer} from "./Reducer/Tourreducer";

const reducer = combineReducers({
    tourlist : tourlistreducer,
});
const initialState = {};
const middleware = [thunk];
const store = createStore (
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;