import { ComponentMeta, ComponentStory } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library';


import { authDecorator, WrappedAuthComponent } from '../../.storybook'
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

const Template: ComponentStory<WrappedAuthComponent> = () => <EmailPassword></EmailPassword>

const Default = Template.bind({})
Default.args = {}
Default.decorators = [authDecorator]

Default.play = async ({ canvasElement }) => {
  console.log(canvasElement)
  // Delay required account for decorator to setup routing/context
  setTimeout(async () => {
    const canvas = within(canvasElement);
  
    await userEvent.type(canvas.getByTestId('email'), 'none@none.com', {
      delay: 50,
    });
    await userEvent.type(canvas.getByTestId('password'), 'password', {
      delay: 50,
    });
  
    await userEvent.click(canvas.getByText('Login'));
  })
};

export { Default }

export default StorybookEntry
