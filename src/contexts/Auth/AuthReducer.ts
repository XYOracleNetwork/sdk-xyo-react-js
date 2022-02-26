import { AuthAction, AuthActionTypes, AuthServiceId, AuthState } from './AuthStateTypes'
import { DefaultState } from './DefaultState'

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.UpdateActiveAuthService: {
      if (!action.payload.activeAuthServiceId) {
        throw new Error('Missing AuthServiceId')
      }
      return { ...state, activeAuthServiceId: action.payload.activeAuthServiceId }
    }

    case AuthActionTypes.RehydrateState: {
      if (!action.payload) {
        throw new Error('Missing Payload')
      }
      return { ...state, ...action.payload }
    }

    case AuthActionTypes.AuthSuccessful: {
      if (!action.payload?.jwtToken || !action.payload?.loggedInAccount) {
        throw new Error('jwtToken or loggedInAccount missing from  payload')
      }
      const authCompleteState: Partial<AuthState> = {
        activeAuthServiceId: AuthServiceId.None,
        isLoading: false,
        reAuthenticate: false,
      }
      return { ...state, ...{ ...authCompleteState, ...action.payload } }
    }

    case AuthActionTypes.AuthFailure: {
      if (!action.payload?.authError) {
        throw new Error('authError missing from  payload')
      }
      const { authError } = action.payload
      return { ...state, ...{ authError, isLoading: false } }
    }

    case AuthActionTypes.Logout: {
      // Keep the existing AuthService List provided by consumers
      const { authServiceList } = state
      return { ...DefaultState, ...{ authServiceList } }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export { authReducer }
