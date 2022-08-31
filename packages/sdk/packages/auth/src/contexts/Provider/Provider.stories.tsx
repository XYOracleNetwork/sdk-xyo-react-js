import { Button, ButtonGroup } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { useEffect, useState } from 'react'

import { AuthActionType } from '../ActionType'
import { useAuthState } from '../hooks'
import { AuthProvider } from './Provider'

// eslint-disable-next-line import/no-default-export
export default {
  component: AuthProvider,
  title: 'auth/AuthProvider',
} as Meta

const authSuccessfulPayload = { issuer: 'https://api.domain.com', jwtToken: '123', loggedInAccount: '0x123' }

const AuthStateComponent = () => {
  const { state, dispatch } = useAuthState()
  const [localStorageAuthState, setLocalStorageAuthState] = useState()

  useEffect(() => {
    // SetTimeout to allow for the state to save to localStorage
    setTimeout(() => {
      const savedState = localStorage.getItem('AuthState')
      if (savedState) {
        setLocalStorageAuthState(JSON.parse(savedState))
      }
    })
  }, [state])

  const authSuccessful = () => {
    dispatch?.({ payload: authSuccessfulPayload, type: AuthActionType.AuthSuccessful })
  }
  const logout = () => {
    dispatch?.({ payload: {}, type: AuthActionType.Logout })
  }
  return (
    <>
      <p>AuthState:</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <p>LocalStorageAuthState:</p>
      <pre>{JSON.stringify(localStorageAuthState, null, 2)}</pre>
      <ButtonGroup>
        <Button onClick={authSuccessful}>AuthSuccessful</Button>
        <Button onClick={logout}>Logout</Button>
      </ButtonGroup>
    </>
  )
}

const Template: ComponentStory<typeof AuthProvider> = (args) => {
  localStorage.setItem('AuthState', JSON.stringify(authSuccessfulPayload))
  return (
    <AuthProvider {...args}>
      <AuthStateComponent />
    </AuthProvider>
  )
}

const Default = Template.bind({})

export { Default }
