import { ComponentStory, Meta } from '@storybook/react'

import { NodeRelationalGraph } from './RelationalGraph'
import { options } from './story'

// eslint-disable-next-line import/no-default-export
export default {
  component: NodeRelationalGraph,
  title: 'node/renderer/NodeRelationalGraph',
} as Meta

const Template: ComponentStory<typeof NodeRelationalGraph> = (props) => <NodeRelationalGraph {...props} />

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { height: 'calc(100vh - 20px)', options, width: '100%' }

export { Default, WithData }
