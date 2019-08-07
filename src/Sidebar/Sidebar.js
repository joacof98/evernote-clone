import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button,List,Divider } from "@material-ui/core";
import styles from "./styles";

import Sidebaritem from '../Sidebaritem/Sidebaritem';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }

  newNoteClick = () => {
    this.setState({
      title: "",
      addingNote: !this.state.addingNote
    });
  };

  handleTitle = txt => {
    this.setState({
      title: txt
    });
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({
      title: '',
      addingNote: false
    });
  }

  selectNote = (note,index) => {
    this.props.selectNote(note,index);
  }

  deleteNote = (note) => {
    this.props.deleteNote(note);
  }

  render() {
    const { notes, classes, selectedNoteIndex } = this.props;
    if(notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button onClick={this.newNoteClick} className={classes.newNoteBtn}>
            {this.state.addingNote ? "Cancel" : "Add Note"}
          </Button>
          {this.state.addingNote ? (
            <div>
              <input
                type="text"
                className={classes.newNoteInput}
                placeholder="Enter note title"
                onKeyUp={e => this.handleTitle(e.target.value)}
              />
              <Button
                className={classes.newNoteSubmitBtn}
                onClick={this.newNote}
              >
                Submit
              </Button>
            </div>
          ) : null
          }
  
          <List>
            {notes.map((note, index) => {
              return (
                <div key={index}>
                  <Sidebaritem
                    note={note}
                    index={index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  />
                  <Divider />
                </div>
              );
            })
            }
          </List>
        </div>
      );
    }
    else {
      return(<div></div>)
    }
  }
}

export default withStyles(styles)(Sidebar);