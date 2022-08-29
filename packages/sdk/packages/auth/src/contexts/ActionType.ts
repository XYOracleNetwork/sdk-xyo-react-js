export enum AuthActionType {
  UpdateActiveAuthService = 'UpdateActiveAuthService',
  TokenCheckComplete = 'TokenCheckComplete',
  RehydrateState = 'RehydrateState',
  Logout = 'Logout',
  AuthSuccessful = 'AuthSuccessful',
  AuthFailure = 'AuthFailure',
}

/** @deprecated use AuthActionType instead*/
export type AuthActionTypes = AuthActionType
