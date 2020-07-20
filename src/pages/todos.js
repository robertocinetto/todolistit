import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Base from "../04.templates/base";

import TodoForm from "../02.molecules/todo-form";
import TodoList from "../02.molecules/todo-list";
import CategorySelection from "../02.molecules/category-selection";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import MuiCardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import MuiFab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { firestore } from "../firebase/firebase.utils";

import { updateTodos, setNewTodoModalOpen } from "../redux/todo/todo.actions";

const CardContent = styled(MuiCardContent)`
  width: 100%;
`;

const Fab = styled(MuiFab)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Todos = (props) => {
  let unsubscribeFromSnapshot = null;

  useEffect(() => {
    const collectionRef = firestore
      .collection("todos")
      .where("currentUser.email", "==", `${props.currentUser.email}`)
      .orderBy("createdAt");

    unsubscribeFromSnapshot = collectionRef.onSnapshot(async (snapshot) => {
      let todos = snapshot.docs.map((doc) => {
        const { done, body, category } = doc.data();
        return {
          id: doc.id,
          done,
          body,
          category,
        };
      });
      props.updateTodos(todos);
    });

    return () => {
      unsubscribeFromSnapshot();
    };
  }, []);

  async function handleOpenCloseModal() {
    props.setNewTodoModalOpen(!props.modalStatus);
  }

  return (
    <Base>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <CategorySelection />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TodoForm />

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h3">Todos</Typography>
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleOpenCloseModal}
              >
                <AddIcon />
              </Fab>
              <TodoList />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Base>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    todos: state.todos.todos,
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateTodos: (todos) => dispatch(updateTodos(todos)),
  setNewTodoModalOpen: (status) => dispatch(setNewTodoModalOpen(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
