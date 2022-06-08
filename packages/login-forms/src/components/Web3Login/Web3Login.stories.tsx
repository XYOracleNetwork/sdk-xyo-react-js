/* eslint-disable import/no-internal-modules */
import { Alert, AlertTitle } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AuthServiceId, useAuthService, useAuthState } from '@xyo-network/react-auth'

import { authDecorator, WrappedAuthComponent } from '../../../../../.storybook'
import { Web3Login } from './Web3Login'

const StorybookEntry = {
  argTypes: {},
  component: Web3Login,
  decorators: [authDecorator],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/Web3Login',
} as ComponentMeta<typeof Web3Login>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { state, dispatch } = useAuthState()
  const { activeAuthServiceId, setActiveAuthServiceId } = useAuthService()

  if (state && dispatch) {
    return (
      <>
        <Alert>
          <AlertTitle>Active Auth Service Id</AlertTitle>
          {activeAuthServiceId}
        </Alert>
        <Web3Login dispatch={dispatch} loggedInAccount={state.loggedInAccount} onSuccess={() => setActiveAuthServiceId?.(AuthServiceId.None)}></Web3Login>
      </>
    )
  } else {
    return <h1>Missing state and dispatch from Auth Context!</h1>
  }
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
