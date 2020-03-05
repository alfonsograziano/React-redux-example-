import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from '@material-ui/core/styles';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import { TextareaAutosize } from "@material-ui/core";

/*
value => il valore dell'input
onSave => props.onSave(text)
*/

const useStyles = makeStyles(theme => ({
    row: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end"
    }
}));


function EditableInputText({ value, onSave, label, fontSize }) {
    const classes = useStyles();

    const [edit, setEdit] = useState(false)
    const [inputValue, setInputValue] = useState(value || "")

    const clear = () => {
        setInputValue(value)
        setEdit(false)
    }

    const save = () => {
        setEdit(false)
        onSave(inputValue)
    }

    useEffect(() => { console.log("Edit: " + edit) }, [])

    return (
        <React.Fragment>
            {
                (edit) ?
                    <div className={classes.col}>
                        <TextareaAutosize id="standard-basic"
                            label={label || ""}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        <div>
                            <IconButton onClick={save}>
                                <DoneIcon />
                            </IconButton>
                            <IconButton onClick={clear}>
                                <ClearIcon />
                            </IconButton>
                        </div>
                    </div> :

                    <div className={classes.col}>
                        <div style={{textAlign:"left"}}>
                            {inputValue}
                        </div>
                        <IconButton onClick={() => setEdit(true)}>
                            <EditIcon />
                        </IconButton>
                    </div>
            }

        </React.Fragment>

    )
}

export default EditableInputText