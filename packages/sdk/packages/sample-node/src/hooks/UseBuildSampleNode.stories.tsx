import type { Meta, StoryFn } from '@storybook/react'
import { ProvidedNodeRenderer } from '@xyo-network/react-node-renderer'
import React from 'react'

import type { SampleNodeModules } from './useBuildSampleNode.ts'
import { useBuildSampleNode } from './useBuildSampleNode.ts'

const modules: SampleNodeModules = {
  Bridge: 'Bridge',
  MemoryArchivist: 'MemoryArchivist',
  Node: 'Node',
  SystemInfoWitness: 'SystemInfoWitness',
}

export default { title: 'modules/node/useBuildSampleNode' } as Meta

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
