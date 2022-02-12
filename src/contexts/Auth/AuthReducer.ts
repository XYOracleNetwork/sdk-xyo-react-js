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

    case AuthActionTypes.UpdateIsLoggedIn: {
      if (action.payload.isLoggedIn === undefined) {
        throw new Error('isLoggedIn is not defined')
      }
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
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

    case AuthActionTypes.UpdateJwtToken: {
      if (!action.payload?.jwtToken === undefined) {
        throw new Error('Missing Payload')
      }
      const { jwtToken } = action.payload
      return { ...state, ...{ jwtToken } }
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
