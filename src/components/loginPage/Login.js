import React, { useState, useEffect } from "react";
import { TextField, Button, Paper } from "@material-ui/core";
import {useDispatch} from "react-redux"
import {login} from "../redux-store/authReducer"
function Login(props) {

    const [loginData, setLogin] = useState({ email:"admin@admin.com", password: "password" })
    const dispatch = useDispatch()
    return (
        <div style={{display:"flex",  justifyContent:"center"}}>
            <Paper style={{ padding: 10, margin: 10,marginTop:50, maxWidth:"550px" }}>
                <TextField
                    style={{ margin: 10 }}
                    value={loginData.email}
                    onChange={(e) => setLogin({ ...loginData, email: e.target.value })}
                />
                <TextField
                    style={{ margin: 10 }}
                    value={loginData.password}
                    onChange={(e) => setLogin({ ...loginData, password: e.target.value })}
                />
                <Button onClick={() => {
                    dispatch(login(loginData.email, loginData.password))
                }}
                    style={{ margin: 10 }}
                    color="primary" variant="contained">
                    LOGIN
                </Button>

            </Paper>
        </div>

    )
}

export default Login