import { Button } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AxiosError } from 'axios'

import { authDecorator, authServiceList, WrappedArgs } from '../../.storybook'
import { AuthActionTypes, useAuthState } from '../../contexts'
import { AuthErrorDialog } from './AuthErrorDialog'
import { ReAuthDialog } from './ReAuthDialog'

const StorybookEntry = {
  argTypes: {
    authState: {
      defaultValue: {
        authServiceList,
      },
    },
  },
  component: AuthErrorDialog,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/AuthErrorDialog',
} as ComponentMeta<typeof AuthErrorDialog & WrappedArgs>

const Template: ComponentStory<typeof AuthErrorDialog & WrappedArgs> = () => {
  const { dispatch } = useAuthState()
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
      <Button
        variant="contained"
        onClick={() => dispatch({ payload: { authError: fakeAxiosError }, type: AuthActionTypes.UpdateAuthError })}
      >
        Trigger API Error - 401
      </Button>
      <Button
        variant="contained"
        onClick={() => dispatch({ payload: { authError: fake403AxiosError }, type: AuthActionTypes.UpdateAuthError })}
      >
        Trigger API Error - 403
      </Button>
      <AuthErrorDialog />
      <ReAuthDialog />
    </>
  )
}

const Default = Template.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
