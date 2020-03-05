import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField, Button } from "@material-ui/core";

function AddNewPost(props) {
    const [form, setForm] = React.useState({title:"", body:""})

    const save = () => {
        if(form.title !== "" && form.body !== ""){
            setForm({title:"", body:""})
            props.onOpenChange(false);
            props.onSave(form)
        }else{
            alert("Attenzione, aggiungi il titolo e il body del post")
        }
    };


    const discard = () => {
        setForm({title:"", body:""})
        props.onOpenChange(false);
    };

    return (

        <Dialog
            open={props.openDialog || false}
            onClose={discard}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Aggiungi post"}</DialogTitle>
            <DialogContent>
                <TextField 
                    style={{width:"100%"}}
                    value={form.title}
                    label="Titolo"
                    onChange={(e)=>setForm({...form, title:e.target.value})}
                />
               
               <div style={{marginTop:10}}>
                   Contenuto del post:
                   <textarea
                    value={form.body}
                    onChange={(e)=>setForm({...form, body:e.target.value})}
                    style={{width:"100%"}}

                   >
                   </textarea>
               </div>

            </DialogContent>

            <DialogActions>
                <Button onClick={discard} color="primary">
                    Annulla
            </Button>
                <Button onClick={save} color="primary" autoFocus>
                    Salva
            </Button>
            </DialogActions>

        </Dialog>
    )
}

export default AddNewPost