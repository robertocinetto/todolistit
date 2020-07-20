import { TodoActionTypes } from "./todo.types";

export const updateTodos = (todos) => ({
  type: TodoActionTypes.UPDATE_TODOS,
  payload: todos,
});

export const setSelectedCategory = (category) => ({
  type: TodoActionTypes.SET_TODOS_CATEGORY,
  payload: category,
});

export const setCategoriesList = (categoriesList) => ({
  type: TodoActionTypes.SET_CATEGORIES_LIST,
  payload: categoriesList,
});

export const setNewTodoModalOpen = (open) => {
  console.log("ciao");
  return {
    type: TodoActionTypes.SET_NEW_TODO_MODAL_OPEN,
    payload: open,
  };
};
