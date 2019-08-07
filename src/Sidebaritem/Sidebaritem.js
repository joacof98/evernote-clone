import React, { Component } from "react";
import { removeHTMLTags } from "../helpers";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import { ListItemText,ListItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class Sidebaritem extends Component {
  selectNote = (n , i) => {
    this.props.selectNote(n,i);
  }

  deleteNote = (n) => {
    if(window.confirm(`Are you sure you want to delete ${n.title} ?`)) {
      this.props.deleteNote(n);
    }
  }

  render() {
    const { index, note, classes, selectedNoteIndex } = this.props;
    return (
      <div key={index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === index}
          alignItems="flex-start"
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(note, index)}
          >
            <ListItemText
              primary={note.title}
              secondary={removeHTMLTags(note.body.substring(0, 30)) + "..."}
            />
          </div>

          <DeleteIcon onClick={() => this.deleteNote(note) } className={classes.deleteIcon} />
        </ListItem>
      </div>
    );
  }
}
  
export default withStyles(styles)(Sidebaritem);