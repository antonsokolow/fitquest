import AsyncStorage from '@react-native-community/async-storage'

class DataManager {
  // It is safe to use AsyncStorage to save user tokens only for Android devices without root
  // and for iOS devices without jailbreak

  storeCredentials = async (username, token) => {
    const firstPair = ['@USERNAME', username]
    const secondPair = ['@TOKEN', token]
    try {
      await AsyncStorage.multiSet([firstPair, secondPair])
    } catch (error) {
      //TODO ErrorManager
    }
  }

  storeCredentialsWithPromise = (username, token, uid) => {
    return new Promise((resolve, reject) => {
      const firstPair = ['@USERNAME', username]
      const secondPair = ['@TOKEN', token]
      const userID = ['@USER_ID', uid]
      AsyncStorage.multiSet([firstPair, secondPair, userID])
        .then(() => {
          resolve(true)
        })
        .catch(error => {
          reject('storeCredentialsWithPromise')
        })
    })
  }

  getCredentials = async () => {
    //let values;
    try {
      //values = await AsyncStorage.multiGet(['@USERNAME', '@TOKEN']);
      const username = await AsyncStorage.getItem('@USERNAME')
      const token = await AsyncStorage.getItem('@TOKEN')
      const uid = await AsyncStorage.getItem('@USER_ID')
      return {username: username, token: token, uid: uid}
    } catch (error) {
      //TODO ErrorManager
    }
  }

  storeProfileWithPromise = profile => {
    return new Promise((resolve, reject) => {
      const growth = [
        '@PROFILE_GROWTH',
        profile.growth ? '' + profile.growth : '',
      ]
      const weight = [
        '@PROFILE_WEIGHT',
        profile.weight ? '' + profile.weight : '',
      ]
      const sex = ['@PROFILE_SEX', profile.sex]
      const goal = ['@PROFILE_GOAL', profile.goal]
      const wweight = [
        '@PROFILE_WWEIGHT',
        profile.wweight ? '' + profile.wweight : '',
      ]
      const level = ['@PROFILE_LEVEL', profile.level ? '' + profile.level : '']
      AsyncStorage.multiSet([growth, weight, sex, goal, wweight, level])
        .then(() => {
          resolve(true)
        })
        .catch(() => {
          reject('Ошибка в методе storeProfileWithPromise')
        })
    })
  }

  storeProfile = async profile => {
    const growth = [
      '@PROFILE_GROWTH',
      profile.growth ? '' + profile.growth : '',
    ]
    const weight = [
      '@PROFILE_WEIGHT',
      profile.weight ? '' + profile.weight : '',
    ]
    const sex = ['@PROFILE_SEX', profile.sex]
    const goal = ['@PROFILE_GOAL', profile.goal]
    const wweight = [
      '@PROFILE_WWEIGHT',
      profile.wweight ? '' + profile.wweight : '',
    ]
    const level = ['@PROFILE_LEVEL', profile.level ? '' + profile.level : '']

    try {
      await AsyncStorage.multiSet([growth, weight, sex, goal, wweight, level])
    } catch (error) {
      //TODO ErrorManager
    }
  }

  getProfile = async () => {
    const keys = [
      '@PROFILE_GROWTH',
      '@PROFILE_WEIGHT',
      '@PROFILE_SEX',
      '@PROFILE_GOAL',
      '@PROFILE_WWEIGHT',
      '@PROFILE_LEVEL',
    ]
    try {
      const stores = await AsyncStorage.multiGet(keys)
      let profile = {}
      stores.map((result, i, store) => {
        let key = store[i][0].split('_')[1].toLowerCase()
        let value = store[i][1]
        profile[key] = value
      })
      return profile
    } catch (error) {
      //TODO ErrorManager
    }
  }
}

export default DataManager
