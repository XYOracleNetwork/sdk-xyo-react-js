export enum AuthActionType {
  UpdateActiveAuthService = 'UpdateActiveAuthService',
  RehydrateState = 'RehydrateState',
  Logout = 'Logout',
  AuthSuccessful = 'AuthSuccessful',
  AuthFailure = 'AuthFailure',
}

/** @deprecated use AuthActionType instead*/
export type AuthActionTypes = AuthActionType
