import { Meta, StoryFn } from '@storybook/react'

import { IndexedResultsNodeProvider } from './node'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/indexed-results',
} as Meta

const Template: StoryFn<React.FC> = (args) => {
  return <IndexedResultsNodeProvider {...args} />
}

const Default = Template.bind({})

export { Default }
