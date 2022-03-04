import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react'

import { WrappedAuthComponent } from '../../../.storybook'
import { AuthProvider, DefaultState, useAuthState } from '../../../contexts'
import { InvalidTokenButton } from './InvalidTokenButton'

const AuthWrap: DecoratorFn = (Story, { args }) => (
  <AuthProvider authState={{ ...DefaultState, ...{ loggedInAccount: 'none@none.com' } }}>
    <Story {...args} />
  </AuthProvider>
)

const StorybookEntry = {
  argTypes: {
    authServiceList: [],
  },
  component: InvalidTokenButton,
  decorators: [AuthWrap],
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/InvalidTokenButton',
} as ComponentMeta<WrappedAuthComponent>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { state } = useAuthState()
  return (
    <>
      <InvalidTokenButton variant="contained" />
      <p>jwtToken in AuthState: {state?.jwtToken}</p>
    </>
  )
}

const Default = Template.bind({})
Default.args = {
  authState: {
    loggedInAccount: 'foo',
  },
}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
