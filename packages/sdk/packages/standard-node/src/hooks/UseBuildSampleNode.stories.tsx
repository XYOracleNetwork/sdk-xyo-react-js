import { Meta, StoryFn } from '@storybook/react'
import { ProvidedNodeRenderer } from '@xyo-network/react-node-renderer'

import { useBuildSampleNode } from './useBuildSampleNode'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/node/useBuildSampleNode',
} as Meta

const Template: StoryFn<React.FC> = (props) => {
  const node = useBuildSampleNode(['MemoryArchivist'])

  return (
    <div style={{ height: '100vh' }}>
      <ProvidedNodeRenderer node={node} {...props} />
    </div>
  )
}

const Default = Template.bind({})

export { Default }
