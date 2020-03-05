import { createStore, applyMiddleware, combineReducers } from "redux"
import { postReducer } from "../testComponent/postReducer"
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { createPromise } from 'redux-promise-middleware'
import { authReducer } from "./authReducer"

const reducers = combineReducers({
    post: postReducer,
    auth: authReducer
})

const middleware = applyMiddleware(createPromise(), thunk, createLogger())

export const store = createStore(reducers, middleware)