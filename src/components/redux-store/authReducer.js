import {logOut, getToken} from "./authService"

const SET_TOKEN = "SET_TOKEN"
export const setToken = (token) =>{
    return {
        type:SET_TOKEN,
        payload:{
            token
        }
    }
}


const LOAD_TOKEN = "LOAD_TOKEN"
export const loadToken = () =>{    
    const token = getToken()
    return {
        type:LOAD_TOKEN,
        payload:{
            token
        }
    }
}

const LOG_OUT = "LOG_OUT"
export const logout = () =>{
    logOut()
    return {
        type:LOG_OUT
    }
}




export const authReducer = function(state = {token:"", appName:"App di prova..."}, action){
    switch(action.type){
        case SET_TOKEN:
            return {...state, token: action.payload.token}
        case LOAD_TOKEN:
            return {...state, token: action.payload.token}
        case LOG_OUT:
            return {...state, token: undefined}
    }
    return state
}
