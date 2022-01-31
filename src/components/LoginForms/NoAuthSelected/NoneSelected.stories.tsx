import { ComponentMeta, ComponentStory } from '@storybook/react'

import { authDecorator, authServiceList, WrappedAuthComponent } from '../../.storybook'
import { NoneSelected } from './NoneSelected'

const StorybookEntry = {
  argTypes: {},
  component: NoneSelected,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'Auth/NoneSelected',
} as ComponentMeta<typeof NoneSelected>

const Template: ComponentStory<WrappedAuthComponent> = () => <NoneSelected></NoneSelected>

const Default = Template.bind({})
Default.args = {
  authState: {
    authServiceList: authServiceList,
  },
}
Default.decorators = [authDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
