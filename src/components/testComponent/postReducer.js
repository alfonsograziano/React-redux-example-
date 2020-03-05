import axios from "axios"
import { generateId } from "./postService"
//_PENDING _FULFILLED _REJECTED

/*
fetching: true/false
fetched: true/false 
data: res.data
error: ""

*/

const FETCH_POSTS = "FETCH_POSTS"
const FETCH_POSTS_PENDING = "FETCH_POSTS_PENDING"
const FETCH_POSTS_FULFILLED = "FETCH_POSTS_FULFILLED"
const FETCH_POSTS_REJECTED = "FETCH_POSTS_REJECTED"
export const fetchPosts = () => {
    return {
        type: FETCH_POSTS,
        payload: axios.get("/posts")
    }
}


const DELETE_POST_AND_FETCH_PENDING = "DELETE_POST_AND_FETCH_PENDING"
const DELETE_POST_AND_FETCH_FULLFILLED = "DELETE_POST_AND_FETCH_FULLFILLED"
const DELETE_POST_AND_FETCH_REJECTED = "DELETE_POST_AND_FETCH_REJECTED"
export const deletePostAndFetch = (id) => {

    return (dispatch) =>{
        dispatch(()=>{
            return {
                type: DELETE_POST_AND_FETCH_PENDING,
                payload: id
            }
        })
        axios.delete("/posts/"+id)
        .then(res=>{
            dispatch(()=>{
                return {
                    type: DELETE_POST_AND_FETCH_FULLFILLED
                }
            })
            dispatch(fetchPosts())
        })
        .catch(err=>{
            dispatch(()=>{
                return {
                    type: DELETE_POST_AND_FETCH_REJECTED,
                    payload: err
                }
            })
        })
    }
}


const UPDATE_POST_AND_FETCH_PENDING = "UPDATE_POST_AND_FETCH"
const UPDATE_POST_AND_FETCH_FULLFILLED = "UPDATE_POST_AND_FETCH_FULLFILLED"
const UPDATE_POST_AND_FETCH_REJECTED = "UPDATE_POST_AND_FETCH_REJECTED"
export const updatePostAndFetch = (post) => {

    return (dispatch) =>{
        dispatch(()=>{
            return {
                type: UPDATE_POST_AND_FETCH_PENDING
            }
        })
        axios.put("/posts/"+post.id,post)
        .then(res=>{
            dispatch(()=>{
                return {
                    type: UPDATE_POST_AND_FETCH_FULLFILLED
                }
            })
            dispatch(fetchPosts())
        })
        .catch(err=>{
            dispatch(()=>{
                return {
                    type: UPDATE_POST_AND_FETCH_REJECTED,
                    payload: err
                }
            })
        })
    }
}

const UPLOAD_POST_AND_FETCH_PENDING = "UPLOAD_POST_AND_FETCH_PENDING"
const UPLOAD_POST_AND_FETCH_FULLFILLED = "UPLOAD_POST_AND_FETCH_FULLFILLED"
const UPLOAD_POST_AND_FETCH_REJECTED = "UPLOAD_POST_AND_FETCH_REJECTED"
export const uploadPostAndFetch = (post) => {

    //In questo caso questa logica postrebbe andare nei servizi ma dato che dopo la tolgo, per ora resta qui
    post.author = "aminId" //TODO: Impostare l'autore con autenticazione etc

    return (dispatch) =>{
        dispatch(()=>{
            return {
                type: UPLOAD_POST_AND_FETCH_PENDING
            }
        })
        axios.post("/posts",post)
        .then(res=>{
            dispatch(()=>{
                return {
                    type: UPLOAD_POST_AND_FETCH_FULLFILLED
                }
            })
            dispatch(fetchPosts())
        })
        .catch(err=>{
            dispatch(()=>{
                return {
                    type: UPLOAD_POST_AND_FETCH_REJECTED,
                    payload: err
                }
            })
        })
    }
}


const initialState = { 
    fetched: false, 
    fetching: false, 
    error: "", 
    data: {},
    newPost:{
        uploading: false,
        uploaded: false,
        error: ""
    },
    deletePost:{
        deleting: false,
        deleted: false,
        error: "",
        id: ""
    },
    updatePost:{
        updating: false,
        updated: false,
        error: "",
        id: ""
    }
}
export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS_PENDING:
            return { ...state, fetching: true, fetched: false, error: "" }
        case FETCH_POSTS_FULFILLED:
            return { ...state, fetching: false, fetched: true, data: action.payload.data }
        case FETCH_POSTS_REJECTED:
            return { ...state, fetching: false, fetched: false, error: action.payload.message }


        case UPDATE_POST_AND_FETCH_PENDING:
            return {...state, updatePost:{ error: "", updated:false, updating:true, id:action.payload}}  
        case UPDATE_POST_AND_FETCH_FULLFILLED:
            return {...state, updatePost:{ error: "", updated:true, updating:false, id:""}}       
        case UPDATE_POST_AND_FETCH_REJECTED:
            return {...state, updatePost:{ error: action.payload.message, updated:false, updating:false}}
        

        case UPLOAD_POST_AND_FETCH_PENDING:
            return {...state, newPost:{ error: "", uploaded:false, uploading:true}}  
        case UPLOAD_POST_AND_FETCH_FULLFILLED:
            return {...state, newPost:{ error: "", uploaded:true, uploading:false}}       
        case UPLOAD_POST_AND_FETCH_REJECTED:
            return {...state, newPost:{ error: action.payload.message, uploaded:false, uploading:false}}
        
    
        case DELETE_POST_AND_FETCH_PENDING:
            return {...state, delete:{ error: "", deleted:false, deleting:true, id:action.payload}}  
        case DELETE_POST_AND_FETCH_FULLFILLED:
            return {...state, delete:{ error: "", deleted:true, deleting:false, id:""}}       
        case UPDATE_POST_AND_FETCH_REJECTED:
            return {...state, newPost:{ error: action.payload.message, deleted:false, deleting:false}}
    }
    return state
}

