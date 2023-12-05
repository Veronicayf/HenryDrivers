import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
//tool chrome
const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose; 

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
export default store;
