import { AuthAction, AuthActionTypes, AuthState } from './AuthStateTypes'
import { DefaultState } from './DefaultState'

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.UpdateActiveAuthService: {
      if (!action.payload.activeAuthServiceId) {
        throw new Error('Missing AuthServiceId')
      }
      return { ...state, activeAuthServiceId: action.payload.activeAuthServiceId }
    }

    case AuthActionTypes.UpdateLoadingState: {
      if (action.payload.isLoading === undefined) {
        throw new Error('isLoading is not defined')
      }
      return { ...state, isLoading: action.payload.isLoading }
    }

    case AuthActionTypes.UpdateAuthError: {
      return { ...state, authError: action.payload.authError }
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
      const authCompleteState = { isLoading: false, isLoggedIn: true, reAuthenticate: false }
      return { ...state, ...{ ...authCompleteState, ...action.payload } }
    }

    case AuthActionTypes.AuthFailure: {
      if (!action.payload?.authError) {
        throw new Error('authError missing from  payload')
      }
      const { authError } = action.payload
      return { ...state, ...{ authError, isLoading: false, isLoggedIn: false } }
    }

    case AuthActionTypes.Logout: {
      // Keep the existing AuthService List provided by consumers
      const { authServiceList } = state
      return { ...DefaultState, ...{ authServiceList } }
    }

    case AuthActionTypes.UpdateReAuthenticate: {
      if (!action.payload?.reAuthenticate === undefined) {
        throw new Error('reAuthenticate missing from payload')
      }
      const { reAuthenticate } = action.payload

      if (reAuthenticate) {
        // mimic a logout when re-authenticating
        const { authServiceList } = state
        return { ...DefaultState, ...{ authServiceList, reAuthenticate } }
      } else {
        return { ...state, ...{ reAuthenticate } }
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

export { authReducer }
