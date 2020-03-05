import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
/*

value => il valore dell'input
onSave => props.onSave(text)
label => Passo questo prop al label del TextField
fontSize => Imposto il font 
*/

const useStyles = makeStyles(theme => ({
    row: {
      display: 'flex',
      flexDirection:"row",
      alignItems:"center"
    }
  }));


function EditableInputText({ value, onSave, label, fontSize }) {
    const classes = useStyles();

    const [edit, setEdit] = useState(false)
    const [inputValue, setInputValue] = useState(value || "")

    const clear = ()=>{
        setInputValue(value)
        setEdit(false)
    }

    const save = ()=>{
        setEdit(false)
        onSave(inputValue)
    }

    useEffect(()=>{console.log("Edit: " + edit)},[])

    return (
        <React.Fragment>
            {
               (edit) ?
                    <div className={classes.row}>
                        <TextField id="standard-basic"
                            label={label || ""}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                        />
                        
                        <IconButton onClick={save}>
                            <DoneIcon />
                        </IconButton>
                        <IconButton onClick={clear}>
                            <ClearIcon />
                        </IconButton>
                    </div> :

                    <div className={classes.row}>
                        <Typography component="div">
                        <Box fontSize={fontSize || 12} m={1}>
                            {inputValue}
                        </Box>
                        </Typography>
                        <IconButton onClick={()=>setEdit(true)}>
                            <EditIcon />
                        </IconButton>
                    </div>
            }

        </React.Fragment>

    )
}

export default EditableInputText