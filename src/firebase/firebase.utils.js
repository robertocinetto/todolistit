import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCTW5_oDyUEbOT4imlQynq7nctT6xjo8eE",
  authDomain: "todolistit-db.firebaseapp.com",
  databaseURL: "https://todolistit-db.firebaseio.com",
  projectId: "todolistit-db",
  storageBucket: "todolistit-db.appspot.com",
  messagingSenderId: "911241654670",
  appId: "1:911241654670:web:63a314aaccfe7fa65834df",
  measurementId: "G-13DJY90NP7",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; //we want to store the user only if firebase auth is set and not null

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const createTodoDocument = async (
  done,
  body,
  category,
  currentUser,
  additionalData
) => {
  const todoRef = firestore.collection(`todos`).doc();

  const snapshot = await todoRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();

    try {
      await todoRef.set({
        done,
        body,
        category,
        currentUser,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating todo", error.message);
    }
  }

  return todoRef;
};

export const deleteTodoDocument = async (id) => {
  const todoRef = firestore.collection(`todos`).doc(id);

  const snapshot = await todoRef.get();
  if (snapshot.exists) {
    try {
      await todoRef.delete();
    } catch (error) {
      console.log(error);
    }
  }
};

export const convertTodosSnapshotToMap = (todos) => {
  const trasformedTodos = todos.docs.map((doc) => {
    const { done, body, category } = doc.data();
    return {
      id: doc.id,
      done,
      body,
      category,
    };
  });
  return trasformedTodos;
};

export const checkTodoDocument = async (id, additionalData) => {
  const todoRef = firestore.doc(`todos/${id}`);
  const snapshot = await todoRef.get();

  if (snapshot.exists) {
    const { done } = snapshot.data();
    try {
      await todoRef.set({
        ...snapshot.data(),
        done: !done,
        ...additionalData,
      });
    } catch (error) {
      console.log(error);
    }
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// this part is for google authentication purpouse only
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
