import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core'

import Home from './pages/home'
import TodoList from './pages/todo-list'

import theme from './00.assets/theme'
console.log(theme)

function App() {
  //TODO aggiungere switch dark mode. Stavi seguendo questo https://codesandbox.io/s/wz9r8330p7
  const [newTheme, setTheme] = useState({
    palette: {
      type: 'light',
    },
  })

  const toggleDarkTheme = () => {
    let newPaletteType = newTheme.palette.type === 'light' ? 'dark' : 'light'
    setTheme({
      palette: {
        type: newPaletteType,
      },
    })
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Home} onToggleDark={toggleDarkTheme} />
        <Route path="/todo" component={TodoList} />
      </Switch>
    </MuiThemeProvider>
  )
}

export default App
