import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import quanLyVeReducer from './Reducer/quanLyVeReducer';
import quanLyLoaiVeReducer from './Reducer/quanLyLoaiVeReducer';
import { tourlistreducer } from './Reducer/Tourreducer';
import appReducer from './Reducer/appReducer';

const reducer = combineReducers({
  tourlist: tourlistreducer,
  quanLyVeState: quanLyVeReducer,
  quanLyLoaiVeState: quanLyLoaiVeReducer,
  appState: appReducer,
});
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);
export default store;
