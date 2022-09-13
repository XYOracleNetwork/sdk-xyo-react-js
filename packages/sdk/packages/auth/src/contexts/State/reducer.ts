import { AuthActionType } from '../ActionType'
import { AuthAction } from './Action'
import { defaultState } from './default'
import { AuthState } from './State'

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.RehydrateState: {
      console.warn('no longer needed.  Logic Built into AuthProvider')
      if (!action.payload) {
        throw new Error('Missing Payload')
      }
      return { ...state, ...action.payload, lastAction: AuthActionType.RehydrateState }
    }

    case AuthActionType.AuthSuccessful: {
      if (!action.payload?.jwtToken || !action.payload?.loggedInAccount || !action.payload.issuer) {
        throw new Error('jwtToken or loggedInAccount or issuer missing from  payload')
      }
      const authCompleteState: Partial<AuthState> = {
        isLoading: false,
        reAuthenticate: false,
      }
      return { ...state, ...{ ...authCompleteState, ...action.payload }, lastAction: AuthActionType.AuthSuccessful }
    }

    case AuthActionType.AuthFailure: {
      if (!action.payload?.authError) {
        throw new Error('authError missing from  payload')
      }
      const { authError } = action.payload
      return { ...state, ...{ authError, isLoading: false }, lastAction: AuthActionType.AuthFailure }
    }

    case AuthActionType.Logout: {
      // preserve issuer to know where we last logged in successfully
      return { ...defaultState(), ...{ issuer: state.issuer, reAuthenticate: action.payload.reAuthenticate }, lastAction: AuthActionType.Logout }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export { authReducer }
