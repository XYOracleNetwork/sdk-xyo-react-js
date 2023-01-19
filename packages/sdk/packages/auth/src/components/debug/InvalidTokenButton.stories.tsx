import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'

import { AuthProvider, defaultState, useAuthState } from '../../contexts'
import { InvalidTokenButton } from './InvalidTokenButton'

const AuthWrap: DecoratorFn = (Story, { args }) => (
  <AuthProvider authState={{ ...defaultState(), ...{ loggedInAccount: 'none@none.com' } }}>
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
} as Meta

const Template: ComponentStory<React.FC<{ authState: { loggedInAccount: string } }>> = () => {
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
