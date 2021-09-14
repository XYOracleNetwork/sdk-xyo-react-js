import { ComponentMeta, ComponentStory } from '@storybook/react'

import InvertableThemeProvider from './InvertableThemeProvider'

const StorybookEntry = {
  argTypes: {},
  component: InvertableThemeProvider,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'InvertableThemeProvider',
} as ComponentMeta<typeof InvertableThemeProvider>

const Template: ComponentStory<typeof InvertableThemeProvider> = (args) => (
  <InvertableThemeProvider {...args}></InvertableThemeProvider>
)

const Default = Template.bind({})
Default.args = {}

export { Default }

export default StorybookEntry
