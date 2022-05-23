import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAuthState } from '@xyo-network/react-auth'
import { Web3Login } from '@xyo-network/react-login-forms'

import { authDecorator, WrappedAuthComponent } from '../.storybook'

const StorybookEntry = {
  argTypes: {},
  component: Web3Login,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/Web3Login',
} as ComponentMeta<typeof Web3Login>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { state, dispatch } = useAuthState()
  if (state && dispatch) {
    return <Web3Login dispatch={dispatch} loggedInAccount={state.loggedInAccount}></Web3Login>
  } else {
    return <></>
  }
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [authDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
