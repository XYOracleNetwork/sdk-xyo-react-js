import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator, WrappedAuthComponent } from '../../../.storybook'
import { useAuthState } from '../../../contexts'
import { Web3Login } from './Web3Login'

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
