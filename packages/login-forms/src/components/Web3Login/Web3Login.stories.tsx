/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { AuthServiceId, useAuthState } from '@xyo-network/react-auth'
import { useState } from 'react'

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

  const [activeAuthServiceId, setActiveAuthServiceId] = useState(AuthServiceId.Web3Wallet)
  if (state && dispatch) {
    return (
      <Web3Login dispatch={dispatch} loggedInAccount={state.loggedInAccount} activeAuthServiceId={activeAuthServiceId} setActiveAuthServiceId={setActiveAuthServiceId}></Web3Login>
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
