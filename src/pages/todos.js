import React from "react";
import Base from "../04.templates/base";
import { connect } from "react-redux";

import TodoForm from "../02.molecules/todo-form";
import TodoList from "../02.molecules/todo-list";
import CategorySelection from "../02.molecules/category-selection";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

import { firestore } from "../firebase/firebase.utils";

import { updateTodos } from "../redux/todo/todo.actions";

class Todos extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const collectionRef = firestore
      .collection("todos")
      .where("currentUser.email", "==", `${this.props.currentUser.email}`)
      .orderBy("createdAt");

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        let todos = snapshot.docs.map((doc) => {
          const { done, body, category } = doc.data();
          return {
            id: doc.id,
            done,
            body,
            category,
          };
        });
        this.props.updateTodos(todos);
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromSnapshot();
  }

  render() {
    return (
      <Base>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CategorySelection />
          </Grid>
          <Grid item xs={8}>
            <TodoForm />

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3">Todos</Typography>
                <TodoList />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Base>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    todos: state.todos.todos,
  };
};
const mapDispatchToProps = (dispatch) => ({
  updateTodos: (todos) => dispatch(updateTodos(todos)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
