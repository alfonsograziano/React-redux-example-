import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { fetchPosts, deletePostAndFetch, updatePostAndFetch, uploadPostAndFetch, prevPage, nextPage } from "./postReducer";
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

    const esciDaStoCazzoDiAccount = () => {
        dispatch(logout())
    }


    return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>

            <div style={{ maxWidth: 700 }}>
                <List>
                    {postList}
                </List>

            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"500", alignItems:"center"}}>
                <Button style={{margin:20}}
                onClick={()=>dispatch(prevPage())}>
                    Prev Page
                </Button>
                {state.post.currentPage}
                <Button  style={{margin:20}}
                onClick={()=>dispatch(nextPage())}>
                    Next Page
                </Button>
            </div>
            <Button color="primary" variant="contained" style={{ margin: 20 }}
                onClick={()=>setOpen(true)}
            >Aggiungi post</Button>

            <Button onClick={esciDaStoCazzoDiAccount}>
                LogOut (lo so che è brutto messo qua ma vabbè)
            </Button>

            <AddNewPost 
                openDialog={open}
                onOpenChange={(state)=>setOpen(state)}
                onSave={(post)=>uploadPost(post)}
            />

        </div>
    )
}

export default Post