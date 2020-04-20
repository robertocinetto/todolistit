import React from 'react'
import { Switch, Route } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core'
import theme from './00.assets/theme'

import Home from './pages/home'
import TodoList from './pages/todo-list'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

console.log(theme)

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          })
        })
      } else {
        this.setState({ currentUser: userAuth })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
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
            render={(props) => (
              <Home {...props} currentUser={this.state.currentUser} />
            )}
          />
          <Route
            path="/todo"
            render={(props) => (
              <TodoList {...props} currentUser={this.state.currentUser} />
            )}
          />
        </Switch>
      </MuiThemeProvider>
    )
  }
}

export default App
