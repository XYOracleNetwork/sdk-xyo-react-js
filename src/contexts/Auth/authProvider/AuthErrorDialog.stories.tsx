import { Button } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AxiosError } from 'axios'
import { useState } from 'react'

import { AuthAction, AuthDispatch, AuthState } from '../AuthStateTypes'
import { AuthErrorDialog } from './AuthErrorDialog'

const StorybookEntry = {
  argTypes: {},
  component: AuthErrorDialog,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AuthErrorDialog',
} as ComponentMeta<typeof AuthErrorDialog>

const Template: ComponentStory<typeof AuthErrorDialog> = () => {
  const [state, dispatch] = useState<Partial<AuthState>>({})
  const handleDispatch = (action: AuthAction) => {
    dispatch({ authError: action.payload.authError })
  }
  const fakeAxiosError = {
    config: {
      url: 'http://localhost:8081',
    },
    isAxiosError: true,
    message: 'Test Error Message',
    response: {
      status: 401,
    },
  } as unknown as AxiosError

  const fake403AxiosError = {
    config: {
      url: 'http://localhost:8081',
    },
    isAxiosError: true,
    message: 'Test Error Message',
    response: {
      status: 403,
    },
  } as unknown as AxiosError

  return (
    <>
      <Button variant="contained" onClick={() => dispatch({ authError: fakeAxiosError })}>
        Trigger API Error - 401
      </Button>
      <Button variant="contained" onClick={() => dispatch({ authError: fake403AxiosError })}>
        Trigger API Error - 403
      </Button>
      <AuthErrorDialog authState={state as AuthState} dispatch={handleDispatch as AuthDispatch}></AuthErrorDialog>
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
