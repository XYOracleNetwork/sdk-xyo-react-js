/* eslint-disable @delagen/deprecation/deprecation */
import { ComponentMeta, ComponentStory } from '@storybook/react'

import ErrorsViewer from './ErrorsViewer'

const StorybookEntry = {
  argTypes: {},
  component: ErrorsViewer,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'ErrorsViewer',
} as ComponentMeta<typeof ErrorsViewer>

const Template: ComponentStory<typeof ErrorsViewer> = (args) => <ErrorsViewer {...args}></ErrorsViewer>

const Default = Template.bind({})
Default.args = {
  errors: [Error('Error One'), Error('Error Two')],
  title: 'Default',
}

export { Default }

export default StorybookEntry
