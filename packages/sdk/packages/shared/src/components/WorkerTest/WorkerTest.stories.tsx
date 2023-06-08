import { Meta, StoryFn } from '@storybook/react'

import { WorkerTest } from './WorkerTest'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'test/WorkerTest',
} as Meta

const Template: StoryFn<React.FC> = () => <WorkerTest />

const Default = Template.bind({})
Default.args = {}

export { Default }
