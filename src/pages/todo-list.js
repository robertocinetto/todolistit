import React from 'react'
import Base from '../04.templates/base'

import { auth } from '../firebase/firebase.utils'

const TodoList = (props) => {
  const { currentUser } = props
  if (!currentUser) {
    props.history.push('/')
  }
  return (
    <Base>
      {currentUser && (
        <button
          onClick={() => {
            auth.signOut()
          }}
        >
          Sign out
        </button>
      )}
    </Base>
  )
}

export default TodoList
