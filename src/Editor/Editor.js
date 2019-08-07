import React, { Component } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      title: "",
      id: ""
    };
  }

  componentDidMount() {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    });
  }

  //Si las propiedades del componente son actualizadas(sel otra nota)
  componentDidUpdate() {
    if(this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
    }
  }

  handleBody = async val => {
    await this.setState({
      text: val
    });
    this.update();
  };

  // Para que haga el req a bbdd luego de que el user no tipee en 1.5s.cls
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text
    });
  },1500);

  updateTitle = async t => {
    await this.setState({title: t});
    this.update();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon} />
        <input
          className={classes.titleInput}
          placeholder="Note Title..."
          value={this.state.title ? this.state.title : ""}
          onChange={(e) => this.updateTitle(e.target.value)}
        />
        <ReactQuill value={this.state.text} onChange={this.handleBody} />
      </div>
    );
  }
}

export default withStyles(styles)(Editor);

