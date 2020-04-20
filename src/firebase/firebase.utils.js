import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCTW5_oDyUEbOT4imlQynq7nctT6xjo8eE',
  authDomain: 'todolistit-db.firebaseapp.com',
  databaseURL: 'https://todolistit-db.firebaseio.com',
  projectId: 'todolistit-db',
  storageBucket: 'todolistit-db.appspot.com',
  messagingSenderId: '911241654670',
  appId: '1:911241654670:web:63a314aaccfe7fa65834df',
  measurementId: 'G-13DJY90NP7',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapshot = await userRef.get()

  if (!snapshot.exists) {
    const { email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
