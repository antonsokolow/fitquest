import { act } from "react-test-renderer"

const initialState = {
  credentials: null, //{token: 'rCUYRgFTGHQt9G6K35q6', username: '5dc2f82d245b2'},
}

const profileInitialState = {
  profile: {
    sex: null,
    goal: null,
    growth: null,
    weight: null,
    wweight: null,
    level: null,
  },
}

const credentialsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREDENTIALS_LOADED':
      return {
        credentials: action.payload,
      }
    default:
      return state
  }
}

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case 'PROFILE_LOADED':
      return {
        profile: action.payload,
      }
    case 'PROFILE_UPDATED':
      return {
        profile: {
          ...state.profile,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

const subscriptionReducer = (state = {subscription: false}, action) => {
  switch (action.type) {
    case 'SUBSCRIPTION_LOADED':
      return {
        subscription: action.payload,
      }
    default:
      return state
  }
}

const waterReducer = (state = {water: {dailyNorm: 2700, level: 0}}, action) => {
  switch (action.type) {
    case 'WATER_LOADED':
      return {
        water: action.payload,
      }
    default:
      return state
  }
}

const tariffsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'TARIFFS_LOADED':
      return {
        tariffs: action.payload,
      }
    default:
      return state
  }
}

/*
 * workouts - массив выполненных тренировок
 * programs - массив доступных программ
 *
 */
const activityReducer = (state = {workouts: [], programs: []}, action) => {
  switch (action.type) {
    case 'ACTIVITY_LOADED':
      return action.payload
    case 'PROGRAMS_LOADED':
      return {
        ...state,
        programs: action.payload,
      }
    case 'WORKOUTS_LOADED':
      return {
        ...state,
        workouts: action.payload,
      }
    case 'WORKOUT_DONE':
      const itemIndexProgram = state.programs.findIndex(
        ({id}) => id === action.payload.programId,
      )
      const itemIndexWorkout = state.workouts.findIndex(
        ({workoutId}) => workoutId === action.payload.workoutId,
      )
      const program = state.programs[itemIndexProgram]
      const updatedProgram =
        itemIndexWorkout === -1
          ? {
              ...program,
              completedTraining: program.completedTraining + 1,
            }
          : program
      return {
        ...state,
        programs: [
          ...state.programs.slice(0, itemIndexProgram),
          updatedProgram,
          ...state.programs.slice(itemIndexProgram + 1),
        ],
        workouts: [
          ...state.workouts,
          {
            workoutId: action.payload.workoutId,
            created: action.payload.created,
          },
        ],
      }
    default:
      return state
  }
}

export {
  credentialsReducer,
  profileReducer,
  subscriptionReducer,
  waterReducer,
  tariffsReducer,
  activityReducer,
}
