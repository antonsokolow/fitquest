//MARK: - User Credentials

const credentialsLoaded = credentials => {
  return {
    type: 'CREDENTIALS_LOADED',
    payload: credentials,
  }
}

//MARK: - User Profile

const profileLoaded = profile => {
  return {
    type: 'PROFILE_LOADED',
    payload: profile,
  }
}

const profileUpdated = data => {
  return {
    type: 'PROFILE_UPDATED',
    payload: data,
  }
}

//MARK: - Subscription

const subscriptionLoaded = subscription => {
  return {
    type: 'SUBSCRIPTION_LOADED',
    payload: subscription,
  }
}

//MARK: - Water Tracker

const waterLoaded = water => {
  return {
    type: 'WATER_LOADED',
    payload: water,
  }
}

//MARK: - Subscription

const tariffsLoaded = tariffs => {
  return {
    type: 'TARIFFS_LOADED',
    payload: tariffs,
  }
}

//MARK: - Activity

const activityLoaded = activity => {
  return {
    type: 'ACTIVITY_LOADED',
    payload: activity,
  }
}

const programsLoaded = programs => {
  return {
    type: 'PROGRAMS_LOADED',
    payload: programs,
  }
}

const workoutsLoaded = workouts => {
  return {
    type: 'WORKOUTS_LOADED',
    payload: workouts,
  }
}

const workoutDone = workout => {
  return {
    type: 'WORKOUT_DONE',
    payload: workout,
  }
}

export {
  credentialsLoaded,
  profileLoaded,
  profileUpdated,
  subscriptionLoaded,
  waterLoaded,
  tariffsLoaded,
  activityLoaded,
  programsLoaded,
  workoutsLoaded,
  workoutDone,
}
