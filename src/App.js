import React, { Component } from "react";
import "./App.css";
import Sidebar from './Sidebar/Sidebar';
import Editor from './Editor/Editor';

const firebase = require("firebase");

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }

  // CRUD functions
  selectNote = (note, index) => {
    this.setState({
      selectedNote: note,
      selectedNoteIndex: index
    });
  };

  noteUpdate = (id, note) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  newNote = async title => {
    const note = {
      title: title,
      body: ""
    };
    const newFromDB = await firebase
      .firestore()
      .collection("notes")
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter(note => note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  };

  deleteNote = async note => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter(n => n !== note)
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      });
    } else {
      this.state.notes.length > 1
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({
            selectedNoteIndex: null,
            selectedNote: null
          });
    }

    firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .delete();
  };

  render() {
    return (
      <div className="app-container">
        <Sidebar
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
        />
        {this.state.selectedNote ? (
          <Editor
            notes={this.state.notes}
            selectedNoteIndex={this.state.selectedNoteIndex}
            selectedNote={this.state.selectedNote}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
