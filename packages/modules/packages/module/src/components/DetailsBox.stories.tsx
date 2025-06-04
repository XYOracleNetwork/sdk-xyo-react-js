import type { Meta, StoryFn } from '@storybook/react-vite'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexCol } from '@xylabs/react-flexbox'
import { MemoryArchivist } from '@xyo-network/archivist-memory'
import { CryptoMarketAssetDiviner } from '@xyo-network/crypto-asset-plugin'
import type { DivinerInstance } from '@xyo-network/diviner-model'
import { MemoryNode } from '@xyo-network/node-memory'
import React, { useState } from 'react'

import { ModuleDetailsBox } from './DetailsBox.tsx'

const StorybookEntry = {
  argTypes: {},
  component: ModuleDetailsBox,
  parameters: { docs: { page: null } },
  title: 'modules/module/DetailsBox',
} as Meta<typeof ModuleDetailsBox>

const NodeTemplate: StoryFn<typeof ModuleDetailsBox> = (args) => {
  const [node, setNode] = useState<MemoryNode>()
  useAsyncEffect(

    async (mounted) => {
      const node = await MemoryNode.create({})
      if (mounted()) {
        setNode(node)
      }
    },
    [],
  )
  return (
    <FlexCol minHeight="80vh" alignItems="stretch">
      <ModuleDetailsBox mod={node} {...args} />
    </FlexCol>
  )
}

const NodeDetails = NodeTemplate.bind({})
NodeDetails.args = {}

const ArchivistTemplate: StoryFn<typeof ModuleDetailsBox> = (args) => {
  const [archivist, setArchivist] = useState<MemoryArchivist>()
  useAsyncEffect(

    async (mounted) => {
      const archivist = await MemoryArchivist.create({})
      if (mounted()) {
        setArchivist(archivist)
      }
    },
    [],
  )
  return (
    <FlexCol minHeight="80vh" alignItems="stretch">
      <ModuleDetailsBox mod={archivist} {...args} />
    </FlexCol>
  )
}

const ArchivistDetails = ArchivistTemplate.bind({})
ArchivistDetails.args = {}

const DivinerTemplate: StoryFn<typeof ModuleDetailsBox> = (args) => {
  const [diviner, setDiviner] = useState<DivinerInstance>()
  useAsyncEffect(

    async (mounted) => {
      const diviner = (await CryptoMarketAssetDiviner.create({})) as DivinerInstance
      if (mounted()) {
        setDiviner(diviner)
      }
    },
    [],
  )
  return (
    <FlexCol minHeight="80vh" alignItems="stretch">
      <ModuleDetailsBox mod={diviner} {...args} />
    </FlexCol>
  )
}

const DivinerDetails = DivinerTemplate.bind({})
DivinerDetails.args = {}

export {
  ArchivistDetails, DivinerDetails, NodeDetails,
}

export default StorybookEntry
