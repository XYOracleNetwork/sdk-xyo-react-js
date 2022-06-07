import { AuthActionType } from '../ActionType'
import { AuthAction } from './Action'
import { defaultState } from './default'
import { AuthState } from './State'

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionType.RehydrateState: {
      if (!action.payload) {
        throw new Error('Missing Payload')
      }
      return { ...state, ...action.payload }
    }

    case AuthActionType.AuthSuccessful: {
      if (!action.payload?.jwtToken || !action.payload?.loggedInAccount) {
        throw new Error('jwtToken or loggedInAccount missing from  payload')
      }
      const authCompleteState: Partial<AuthState> = {
        isLoading: false,
        reAuthenticate: false,
      }
      return { ...state, ...{ ...authCompleteState, ...action.payload } }
    }

    case AuthActionType.AuthFailure: {
      if (!action.payload?.authError) {
        throw new Error('authError missing from  payload')
      }
      const { authError } = action.payload
      return { ...state, ...{ authError, isLoading: false } }
    }

    case AuthActionType.Logout: {
      // Keep the existing AuthService List provided by consumers
      const { authServiceList } = state
      return { ...defaultState(), ...{ authServiceList }, ...{ reAuthenticate: action.payload.reAuthenticate } }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export { authReducer }
