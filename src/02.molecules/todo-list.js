import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MuiHighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  checkTodoDocument,
  deleteTodoDocument,
} from "../firebase/firebase.utils";

const TodoListWrapper = styled.ul`
  list-style: none;
  padding: 0;
`;
const TodoElement = styled.li`
  background-color: #4f4f4f;
  border: 1px solid #7a7a7a;
  padding: 0 9px;
  margin-bottom: 10px;
  cursor: pointer;
  position: relative;

  &.done {
    background-color: #383838;
  }
`;

const HighlightOffIcon = styled(MuiHighlightOffIcon)`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 9999;
`;

const TodoList = (props) => {
  let todoListFilteredUndone = props.todos
    .filter((todo) => todo.category === props.categorySelected)
    .filter((todo) => todo.done === false);

  todoListFilteredUndone = todoListFilteredUndone.map((todo, index) => {
    return (
      <TodoElement key={todo.id} onClick={() => handleCheck(todo.id)}>
        <FormControlLabel
          control={
            <Checkbox
              checked={todo.done}
              onChange={() => handleCheck(todo.id)}
              name={todo.id}
              color="primary"
            />
          }
          label={todo.body}
        />
        <HighlightOffIcon onClick={(event) => deleteTodo(event, todo.id)} />
      </TodoElement>
    );
  });

  let todoListFilteredDone = props.todos
    .filter((todo) => todo.category === props.categorySelected)
    .filter((todo) => todo.done === true);

  todoListFilteredDone = todoListFilteredDone.map((todo, index) => {
    return (
      <TodoElement
        key={todo.id}
        onClick={() => handleCheck(todo.id)}
        className="done"
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={todo.done}
              onChange={() => handleCheck(todo.id)}
              name={todo.id}
              color="primary"
            />
          }
          label={todo.body}
        />
        <HighlightOffIcon onClick={(event) => deleteTodo(event, todo.id)} />
      </TodoElement>
    );
  });

  async function deleteTodo(event, id) {
    event.stopPropagation();
    deleteTodoDocument(id);
  }

  async function handleCheck(id) {
    checkTodoDocument(id);
  }

  return (
    <TodoListWrapper>
      {todoListFilteredUndone}
      {todoListFilteredDone}
    </TodoListWrapper>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  categorySelected: state.todos.categorySelected,
});

export default connect(mapStateToProps)(TodoList);
