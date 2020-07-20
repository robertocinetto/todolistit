import React, { useEffect } from "react";
import { connect } from "react-redux";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { checkTodoDocument } from "../firebase/firebase.utils";

const TodoList = (props) => {
  async function handleCheck(event) {
    checkTodoDocument(event.target.name);
  }

  let todoList = props.todos.map((todo, index) => {
    return (
      <li key={todo.id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={todo.done}
              onChange={handleCheck}
              name={todo.id}
            />
          }
          label={todo.body}
        />
      </li>
    );
  });

  return <ul>{todoList}</ul>;
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
});

export default connect(mapStateToProps)(TodoList);
