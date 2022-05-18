import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StyleGuideExample } from './StyleGuide.example'

const StorybookEntry = {
  argTypes: {},
  component: StyleGuideExample,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'UI/StyleGuide',
} as ComponentMeta<typeof StyleGuideExample>

const Template: ComponentStory<typeof StyleGuideExample> = () => <StyleGuideExample />

const Default = Template.bind({})
Default.args = {}
Default.decorators = []

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
