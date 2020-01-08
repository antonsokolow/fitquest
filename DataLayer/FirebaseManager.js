import auth, {firebase} from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {LoginManager, AccessToken, LoginButton} from 'react-native-fbsdk'

const moment = require('moment')
require('moment/min/locales.min')
import * as RNLocalize from 'react-native-localize'
moment.locale(RNLocalize.getLocales()[0].languageCode)

class FirebaseManager {
  // Handle user state changes
  onAuthStateChanged = user => {
    if (user) {
      const isAnonymous = user.isAnonymous
      this.getUserProfile(user.uid)
    } else {
      // User login out
    }
  }

  subscriber = onAuthStateChanged =>
    auth().onAuthStateChanged(onAuthStateChanged)
  // subscriber = onAuthStateChanged => auth().onAuthStateChanged

  getUserProfile = userId => {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('profile')
        .doc(userId)
        .get()
        .then(querySnapshot => {
          resolve(querySnapshot.data())
        })
        .catch(error => {
          reject(error.message)
        })
    })
  }

  getCollection = collection => {
    return new Promise((resolve, reject) => {
      firestore()
        .collection(collection)
        .doc(this.user.uid)
        .get()
        .then(querySnapshot => {
          resolve(querySnapshot.data())
        })
        .catch(error => {
          reject(error.message)
        })
    })
  }

  getDrinkedWater = () => {
    return new Promise((resolve, reject) => {
      this.getWater(this.user.uid)
        .then(querySnapshot => {
          let waterLevel = 0
          querySnapshot.forEach(doc => {
            waterLevel += doc.data().amount
          })
          resolve(waterLevel)
        })
        .catch(error => {
          reject('getDrinkedWater Ошибка при получении активности', error)
        })
    })
  }

  getWater = userId => {
    let start = new Date()
    start.setHours(0, 0, 0, 0)

    let end = new Date(start.getTime())
    end.setHours(23, 59, 59, 999)
    return new Promise((resolve, reject) => {
      firestore()
        .collection('activity/' + userId + '/water')
        .where('created', '>=', start)
        .where('created', '<=', end)
        .get()
        .then(querySnapshot => {
          resolve(querySnapshot)
        })
        .catch(error => {
          reject(error.message)
        })
    })
  }

  getActivity = (start, end) => {
    return new Promise((resolve, reject) => {
      if (!this.user) {
        reject('User is not set')
      }

      firestore()
        .collection('activity/' + this.user.uid + '/workout')
        .where('created', '>=', start)
        .where('created', '<=', end)
        .get()
        .then(querySnapshot => {
          let workouts = []
          querySnapshot.forEach(doc => {
            workouts.push(doc.data())
          })
          resolve(workouts)
        })
        .catch(error => {
          reject(error.message)
        })
    })
  }

  saveWater = amount => {
    return new Promise((resolve, reject) => {
      firestore()
        .collection('activity/' + this.user.uid + '/water')
        .add({
          amount: amount,
          created: new Date(),
        })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.message)
        })
    })
  }

  getWorkout = () => {
    let start = new Date()
    start.setHours(0, 0, 0, 0)

    let end = new Date(start.getTime())
    end.setHours(23, 59, 59, 999)
    return new Promise((resolve, reject) => {
      if (!this.user) {
        reject('User is not set')
      }
      firestore()
        .collection('activity/' + this.user.uid + '/workout')
        .where('created', '>=', start)
        .where('created', '<=', end)
        .get()
        .then(querySnapshot => {
          const workouts = querySnapshot.docs.map(doc => {
            return doc.data()
          })
          resolve(workouts)
        })
        .catch(error => {
          reject(error.message)
        })
    })
  }

  saveWorkout = workoutId => {
    return new Promise((resolve, reject) => {
      if (!this.user) {
        reject('User is not set')
      }

      firestore()
        .collection('activity/' + this.user.uid + '/workout')
        .add({
          workoutId: workoutId,
          created: new Date(),
        })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.message)
        })
    })
  }

  createDocumentWithPromise = (collection, document) => {
    return new Promise((resolve, reject) => {
      //document.created = firebase.database.ServerValue.TIMESTAMP
      //created: firestore.Timestamp.fromDate(new Date())
      firestore()
        .collection(collection)
        .doc(this.user.uid)
        .set({
          ...document,
          created: firestore.Timestamp.fromDate(new Date()),
        })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  updateDocumentWithPromise = (collection, fields) => {
    return new Promise((resolve, reject) => {
      firestore()
        .collection(collection)
        .doc(this.user.uid)
        .update({
          ...fields,
          updated: firestore.Timestamp.fromDate(new Date()),
        })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  createUserProfile = async (userId, profile) => {
    try {
      const querySnapshot = await firestore()
        .collection('profile')
        .doc(userId)
        .set({
          weight: profile.weight,
          growth: profile.growth,
        })
    } catch (e) {
                  //TODO ErrorManager
                }
  }

  updateUserProfile = async (user, displayName) => {
    try {
      await user.updateProfile({
        displayName: displayName,
      })
    } catch (e) {
                  //TODO ErrorManager
                }
  }

  signInAnonymously = async () => {
    try {
      const userCredential = await auth().signInAnonymously()
      return userCredential
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
    }
  }

  anonymousLoginWithPromise = () => {
    let _hasCanceled = false
    return new Promise((resolve, reject) => {
      auth()
        .signInAnonymously()
        .then(userCredential => {
          resolve(userCredential.user)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  linkFacebookToAnonymousAccount = () => {
    let _hasCanceled = false
    return new Promise((resolve, reject) => {
      LoginManager.logInWithPermissions(['public_profile', 'email'])
        .then(result => {
          if (result.isCancelled) {
            _hasCanceled = true
            reject('User cancelled the login process')
          }
          return AccessToken.getCurrentAccessToken()
        })
        .then(data => {
          if (_hasCanceled) {
            return
          }
          if (!data) {
            _hasCanceled = true
            reject('Something went wrong obtaining access token')
          }
          return firebase.auth.FacebookAuthProvider.credential(data.accessToken)
        })
        .then(credential => {
          if (_hasCanceled) {
            return
          }
          return firebase.auth().currentUser.linkWithCredential(credential)
        })
        .then(usercred => {
          if (_hasCanceled) {
            return
          }
          if (usercred.user) {
            resolve(usercred.user)
          } else {
            reject('Something went wrong linking facebook profile')
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  linkAnonymousAccount = async credential => {
    try {
      const usercred = await auth().currentUser.linkWithCredential(credential)
      return usercred.user
    } catch (error) {
      errorManager(error)
    }
  }

  facebookLogin = async callback => {
    // Login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ])

    if (result.isCancelled) {
      return
    }
    const data = await AccessToken.getCurrentAccessToken()
    if (!data) {
      return
    }
    
    try {
      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      )
      const facebookLoginResult = await firebase
        .auth()
        .signInWithCredential(credential)
      callback(facebookLoginResult)
    } catch (e) {
      errorManagere(e)
    }

  }

  /*
   * Авторизует в Firebase через Facebook
   * В случае успешной авторизации возвращает профиль пользователя
   */
  facebookLoginWithPromise = () => {
    let _hasCanceled = false
    return new Promise((resolve, reject) => {
      LoginManager.logInWithPermissions(['public_profile', 'email'])
        .then(result => {
          if (result.isCancelled) {
            _hasCanceled = true
            reject('User cancelled the login process')
          }
          return AccessToken.getCurrentAccessToken()
        })
        .then(data => {
          if (_hasCanceled) {
            return
          }
          if (!data) {
            _hasCanceled = true
            reject('Something went wrong obtaining access token')
          }
          return firebase.auth.FacebookAuthProvider.credential(data.accessToken)
        })
        .then(credential => {
          if (_hasCanceled) {
            return
          }
          return firebase.auth().signInWithCredential(credential)
        })
        .then(facebookLoginResult => {
          if (_hasCanceled) {
            return
          }
          if (facebookLoginResult.user) {
            resolve(facebookLoginResult.user)
          } else {
            reject('Something went wrong obtaining user profile')
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  loginWithEmailAndPassword = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      console.error(e.message)
    }
  }

  logout = async () => {
    try {
      await auth().signOut()
    } catch (e) {
      console.error(e.message)
    }
  }
}

export default FirebaseManager
