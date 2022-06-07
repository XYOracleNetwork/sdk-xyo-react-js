/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { AuthDispatch, useAuthState } from '@xyo-network/react-auth'

import { authDecorator, WrappedAuthComponent } from '../../../../../.storybook'
import { EmailPassword } from './EmailPassword'

const StorybookEntry = {
  argTypes: {},
  component: EmailPassword,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/EmailPassword',
} as ComponentMeta<typeof EmailPassword>

const Template: ComponentStory<WrappedAuthComponent> = () => {
  const { dispatch, state } = useAuthState()
  return <EmailPassword dispatch={dispatch as AuthDispatch} loggedInAccount={state?.loggedInAccount}></EmailPassword>
}

const Default = Template.bind({})
Default.args = {}
Default.decorators = [authDecorator]

const SuccessfulRequest = Template.bind({})
SuccessfulRequest.args = {}
SuccessfulRequest.decorators = [authDecorator]

// eslint-disable-next-line require-await
SuccessfulRequest.play = async ({ canvasElement }) => {
  // Delay accounts for testing library seeing the rendered component story?
  setTimeout(async () => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByTestId('email'), 'none@none.com', {
      delay: 50,
    })
    await userEvent.type(canvas.getByTestId('password'), 'password', {
      delay: 50,
    })

    await userEvent.click(canvas.getByText('Login'))
  })
}

const FailedRequest = Template.bind({})
FailedRequest.args = {}

// eslint-disable-next-line require-await
FailedRequest.play = async ({ canvasElement }) => {
  // Delay accounts for testing library seeing the rendered component story?
  setTimeout(async () => {
    const canvas = within(canvasElement)

    await userEvent.type(canvas.getByTestId('email'), 'none@none.com', {
      delay: 50,
    })
    await userEvent.type(canvas.getByTestId('password'), 'foo', {
      delay: 50,
    })

    await userEvent.click(canvas.getByText('Login'))
  })
}
FailedRequest.decorators = [authDecorator]

export { Default, FailedRequest, SuccessfulRequest }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
