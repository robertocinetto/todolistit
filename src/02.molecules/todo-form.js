import React, { useState } from "react";
import { connect } from "react-redux";

import MuiCard from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { createTodoDocument } from "../firebase/firebase.utils";

const TodoForm = (props) => {
  const [done, setDone] = useState(false);
  const [body, setBody] = useState("");
  const category = "todo";

  async function handleAddTodo(event) {
    event.preventDefault();

    try {
      await createTodoDocument(done, body, category, props.currentUser);

      setDone(false);
      setBody("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChange(event) {
    setDone(false);
    setBody(event.target.value);
  }

  return (
    <MuiCard variant="outlined">
      <CardContent>
        <Typography variant="h3">New todo</Typography>
        <form onSubmit={handleAddTodo}>
          <TextField
            id=""
            label="todo"
            type="text"
            name="body"
            value={body}
            onChange={handleChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </form>
      </CardContent>
    </MuiCard>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};

export default connect(mapStateToProps)(TodoForm);
