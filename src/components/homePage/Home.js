import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "../loginPage/Login";
import Post from "../testComponent/Post";
import { useSelector } from "react-redux"

function Home(props) {

    const auth = useSelector(state => state.auth)

    useEffect(() => {
        if (auth.loggedIn) {
            //alert("Complimenti coglione, ti sei loggato")
        }
    }, [auth])


    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        {
                            (auth.loggedIn) ?
                                <li>
                                    <Link to="/app">APP</Link>
                                </li> 
                                :
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                        }
                    </ul>
                </nav>

                {
                    (auth.loggedIn) ?
                        <Switch>
                            <Route path="/app">
                                <Post />
                            </Route>
                        </Switch> 
                        :
                        <Switch>
                            <Route path="/login">
                                <Login />
                            </Route>
                        </Switch>
                }

            </div>
        </Router>
    )
}

export default Home