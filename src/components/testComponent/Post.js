import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchPosts, deletePostAndFetch, updatePostAndFetch, uploadPostAndFetch } from "./postReducer";
import { setToken } from "../redux-store/authReducer";
import { logout } from "../redux-store/authReducer";
import PostItem from "./PostItem";
import Button from "@material-ui/core/Button"
import { List, ListItem } from "@material-ui/core";
import AddNewPost from "./AddNewPost"

function Post(props) {

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const [posts, setPosts] = useState(new Array())
    const [postList, setPostList] = useState()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        dispatch(setToken("Tokeeennn"))
        dispatch(fetchPosts())
    }, [])

    useEffect(() => {
        if (typeof state.auth.token !== "undefined") {
            setPosts(state.post.data)

        } else {
            setPosts([])
        }

    }, [state])

    useEffect(() => {
        if (Array.isArray(posts)) {
            setPostList(
                posts.map(item => {
                    return (
                        <ListItem key={item.id}>
                            <PostItem
                                post={item}
                                onBodyUpdate={(post) => updatePost(post)}
                                onTitleUpdate={(post) => updatePost(post)}
                                onPostDelete={(id) => deletePost(id)}
                            />
                        </ListItem>
                    )
                })
            )
        }

    }, [posts])

    const uploadPost = (post) => {
        dispatch(uploadPostAndFetch(post))
    }

    const updatePost = (post) => {
        dispatch(updatePostAndFetch(post))
    }

    const deletePost = (id) => {
        dispatch(deletePostAndFetch(id))
    }

    const login = () => {
        dispatch(setToken("AUTH-user123"))
    }


    const esciDaStoCazzoDiAccount = () => {
        dispatch(logout())
    }


    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
            <h1>{state.auth.appName}</h1>
            {(state.auth.token) ?
                <div>
                    <h2>Utente loggato</h2>
                    <button onClick={esciDaStoCazzoDiAccount}>Logout</button>
                </div>
                :
                <div>
                    <h2>Utente non loggato</h2>
                    <button onClick={login}>Login</button>
                </div>
            }


            <div style={{ maxWidth: 700 }}>
                <List>
                    {postList}
                </List>

            </div>
            <Button color="primary" variant="contained" style={{ margin: 20 }}
                onClick={()=>setOpen(true)}
            >Aggiungi post</Button>

            <AddNewPost 
                openDialog={open}
                onOpenChange={(state)=>setOpen(state)}
                onSave={(post)=>uploadPost(post)}
            />

        </div>
    )
}

export default Post