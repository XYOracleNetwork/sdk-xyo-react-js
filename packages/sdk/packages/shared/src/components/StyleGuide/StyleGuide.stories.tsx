import { Meta, StoryFn } from '@storybook/react'

import { StyleGuideExample } from './StyleGuide.example'

const StorybookEntry = {
  argTypes: {},
  component: StyleGuideExample,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'shared/StyleGuide',
} as Meta<typeof StyleGuideExample>

const Template: StoryFn<typeof StyleGuideExample> = () => <StyleGuideExample />

const Default = Template.bind({})
Default.args = {}
Default.decorators = []

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
