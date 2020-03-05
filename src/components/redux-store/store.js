import { createStore, applyMiddleware, combineReducers } from "redux"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'


import { authReducer } from "./authReducer"
import { postReducer } from "../testComponent/postReducer"
import { appInfoReducer } from "./appInfoReducer"

const reducers = combineReducers({
    post: postReducer,
    auth: authReducer,
    appInfo: appInfoReducer
})

const middleware = applyMiddleware(createPromise(), thunk, createLogger())

export const store = createStore(reducers, middleware)