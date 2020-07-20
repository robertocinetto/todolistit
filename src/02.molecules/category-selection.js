import React from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { connect } from "react-redux";
import {
  setSelectedCategory,
  setCategoriesList,
} from "../redux/todo/todo.actions";

const CategorySelection = (props) => {
  async function handleChange(event) {
    await props.setSelectedCategory(event.target.value);
  }

  // retrieve the categories from the total collection of todos of the current user
  const mixedCategories = [];

  for (let key in props.todos) {
    mixedCategories.push(props.todos[key].category);
  }

  let uniqueCategories = [...new Set(mixedCategories)].map(
    (category, index) => {
      return (
        <FormControlLabel
          key={index.toString()}
          value={category}
          control={<Radio color="primary" />}
          label={category}
        />
      );
    }
  );

  (async () => await props.setCategoriesList([...new Set(mixedCategories)]))();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h3">Lists</Typography>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={props.categorySelected}
          onChange={handleChange}
        >
          {uniqueCategories}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  categorySelected: state.todos.categorySelected,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedCategory: (category) => dispatch(setSelectedCategory(category)),
  setCategoriesList: (categoriesList) =>
    dispatch(setCategoriesList(categoriesList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelection);
