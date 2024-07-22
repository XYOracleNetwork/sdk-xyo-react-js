import { Meta, StoryFn } from '@storybook/react'
import { ProvidedNodeRenderer } from '@xyo-network/react-node-renderer'

import type { SampleNodeModules } from './useBuildSampleNode.js'
import { useBuildSampleNode } from './useBuildSampleNode.js'

const modules: SampleNodeModules = {
  Bridge: 'Bridge',
  MemoryArchivist: 'MemoryArchivist',
  Node: 'Node',
  SystemInfoWitness: 'SystemInfoWitness',
}

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/node/useBuildSampleNode',
} as Meta

const Template: StoryFn<React.FC> = (props) => {
  const node = useBuildSampleNode(modules, 'https://api.archivist.xyo.network')

  return (
    <div style={{ height: '100vh' }}>
      <ProvidedNodeRenderer node={node} {...props} />
    </div>
  )
}

const Default = Template.bind({})

export { Default }
