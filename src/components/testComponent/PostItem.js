import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

import EditableInputText from "../EditableInputText"
import EditableTextArea from "../EditableTextArea"
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  header: {
    width:"100%",
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
}));

/*Props
post => {author:"", title:"", body:"", id:""}

onTitleUpdate => props.onTitleUpdate(newTitle, post)
onBodyUpdate => props.onBodyUpdate(newBody, post)
onPostDelete => props.onPostDelete(id)
*/

function PostItem({ post, onTitleUpdate, onBodyUpdate, onPostDelete }) {
  const classes = useStyles();

  return (
    <ExpansionPanel style={{ width: "100%" }}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <div className={classes.header}>
          <EditableInputText
            value={post.title}
            onSave={(e) => onTitleUpdate({ ...post, title: e })}
            fontSize={16}
          />
          <IconButton onClick={()=>onPostDelete(post.id)}>
            <HighlightOffIcon />
          </IconButton>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div>
          <EditableTextArea
            value={post.body}
            onSave={(e) => onBodyUpdate({ ...post, body: e })}
          />
          <p><em>Author:{" " + post.author}</em></p>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>

  )
}

export default PostItem