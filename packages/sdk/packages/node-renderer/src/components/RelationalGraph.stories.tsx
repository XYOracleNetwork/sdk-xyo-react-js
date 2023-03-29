import { ComponentStory, Meta } from '@storybook/react'

import { useCytoscapeElements, useCytoscapeOptions } from '../hooks'
import { NodeRelationalGraph } from './RelationalGraph'
import { MemoryNodeDecorator, options } from './story'

// eslint-disable-next-line import/no-default-export
export default {
  component: NodeRelationalGraph,
  title: 'node/renderer/NodeRelationalGraph',
} as Meta

const Template: ComponentStory<typeof NodeRelationalGraph> = (props) => <NodeRelationalGraph {...props} />
const TemplateDescribe: ComponentStory<typeof NodeRelationalGraph> = (props) => {
  const elements = useCytoscapeElements()
  const options = useCytoscapeOptions(elements)
  return <NodeRelationalGraph options={options} {...props} />
}

const defaultProps = {
  height: 'calc(100vh - 20px)',
  width: '100%',
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = { options, ...defaultProps }

const WithDescribe = TemplateDescribe.bind({})
WithDescribe.args = { ...defaultProps }
WithDescribe.decorators = [MemoryNodeDecorator]

export { Default, WithData, WithDescribe }
