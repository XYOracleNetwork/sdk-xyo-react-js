import { Meta, StoryFn } from '@storybook/react'
import { NotFound } from '@xyo-network/react-shared'

const StorybookEntry = {
  argTypes: {},
  component: NotFound,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'webapp/NotFound',
} as Meta<typeof NotFound>

const Template: StoryFn<typeof NotFound> = () => {
  return <NotFound />
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
