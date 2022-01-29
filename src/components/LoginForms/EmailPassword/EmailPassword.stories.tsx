import { ComponentMeta, ComponentStory } from '@storybook/react'
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

const Template: ComponentStory<WrappedAuthComponent> = () => (
  <EmailPassword></EmailPassword>
)

const Default = Template.bind({})
Default.args = {}
Default.decorators = [authDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
