import { applyMiddleware, createStore } from "redux";
import rootReducers from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const store = createStore(rootReducers, applyMiddleware(thunk, logger));

export default store;