import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./00.assets/theme";

import Home from "./pages/home";
import TodoList from "./pages/todos";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUserInState } from "./redux/user/user.actions";

console.log(theme);

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUserInState } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //listener that fires a function if the authentication situation chages
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); //if user is loged in it is stored inside db

        //onSnapshot: this method fires when something change inside the snapshot relative to the reference.
        //In addition it return also the content of the snapshot, content that we will store in the state of the app
        userRef.onSnapshot((snapshot) => {
          setCurrentUserInState({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      } else {
        // if userAuth is null i set the current user in state to null
        setCurrentUserInState(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  //TODO aggiungere switch dark mode. Stavi seguendo questo https://codesandbox.io/s/wz9r8330p7
  // const [newTheme, setTheme] = useState({
  //   palette: {
  //     type: 'light',
  //   },
  // })

  // const toggleDarkTheme = () => {
  //   let newPaletteType = newTheme.palette.type === 'light' ? 'dark' : 'light'
  //   setTheme({
  //     palette: {
  //       type: newPaletteType,
  //     },
  //   })
  // }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? <Redirect to="/todo" /> : <Home />
            }
          />
          <Route
            path="/todo"
            render={() =>
              this.props.currentUser ? <TodoList /> : <Redirect to="/" />
            }
          />
        </Switch>
      </MuiThemeProvider>
    );
  }
}
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUserInState: (user) => dispatch(setCurrentUserInState(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
