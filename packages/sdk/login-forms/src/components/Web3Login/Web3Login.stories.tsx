/* eslint-disable import/no-internal-modules */
import { Typography } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAuthState } from '@xyo-network/react-auth'
import { authDecorator, WrappedAuthComponent } from '@xyo-network/react-storybook'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Web3Login } from './Web3Login'

const redirectUrl = '/foo'

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
  const location = useLocation()
  location.state = { from: { pathname: redirectUrl } }

  if (state && dispatch) {
    return (
      <>
        <Routes>
          <Route
            path="/foo"
            element={
              <Typography variant="body1" color={'green'}>
                Successfully routed to redirectUrl: {redirectUrl} after login
              </Typography>
            }
          />
        </Routes>
        <Web3Login dispatch={dispatch} loggedInAccount={state.loggedInAccount} onSuccess={() => console.log('succeeded')}></Web3Login>
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
