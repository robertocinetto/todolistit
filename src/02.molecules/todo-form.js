import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import Select from "@material-ui/core/Select";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
// import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import { createTodoDocument } from "../firebase/firebase.utils";

import { setNewTodoModalOpen } from "../redux/todo/todo.actions";

const filter = createFilterOptions();

const FormWrapper = styled.form`
  > * {
    width: 100%;
  }
`;

const TodoForm = (props) => {
  const [done, setDone] = useState(false);
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("default");

  const categoriesSelect = props.categoriesList.map((category) => {
    return { title: category };
  });

  console.log(props.categoriesList);

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
    setBody(event.target.value);
  }

  // async function handleSelectChange(event) {
  //   setCategory(event.target.value);
  // }

  async function handleOpenCloseModal() {
    props.setNewTodoModalOpen(!props.modalStatus);
  }

  return (
    <Dialog
      onClose={handleOpenCloseModal}
      aria-labelledby="simple-dialog-title"
      open={props.modalStatus}
    >
      <DialogTitle id="simple-dialog-title">New todo</DialogTitle>
      <DialogContent>
        <FormWrapper onSubmit={handleAddTodo}>
          <TextField
            id=""
            label="todo"
            type="text"
            name="body"
            value={body}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <FormControl>
            <Autocomplete
              value={category}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setCategory({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setCategory(newValue.inputValue);
                } else {
                  setCategory(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== "") {
                  filtered.push({
                    inputValue: params.inputValue,
                    title: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={categoriesSelect}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.title;
              }}
              renderOption={(option) => option.title}
              style={{ width: "100%" }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
            />
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  categoriesList: state.todos.categoriesList,
  modalStatus: state.todos.modalStatus,
});

const mapDispatchToProps = (dispatch) => ({
  setNewTodoModalOpen: (status) => dispatch(setNewTodoModalOpen(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);