import { applyMiddleware, compose, createStore } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"
import createRootReducer from "../reducers";
import thunk from "redux-thunk";
// import { logger } from "redux-logger/src";
import {  AuthStateTransform } from "../reducers/authReducer";
import {  ProjectStateTransform } from "../reducers/projectsReducer";

export const history = createBrowserHistory();

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth", "projects"],
	transforms: [AuthStateTransform, ProjectStateTransform]
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

const preloadedState = window.__PRELOADED_STATE__;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	persistedReducer,
	preloadedState,
	composeEnhancers(
		applyMiddleware(
			routerMiddleware(history),
			thunk,
			// logger
		),
	)
);

export const persistor = persistStore(
	store,
);

export default store;
