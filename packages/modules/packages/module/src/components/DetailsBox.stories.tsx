import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexCol } from '@xylabs/react-flexbox'
import { MemoryArchivist } from '@xyo-network/archivist'
import { XyoCryptoMarketAssetDiviner } from '@xyo-network/crypto-asset-plugin'
import { DivinerModule } from '@xyo-network/diviner'
import { MemoryNode } from '@xyo-network/node'
import { useState } from 'react'

import { ModuleDetailsBox } from './DetailsBox'

const StorybookEntry = {
  argTypes: {},
  component: ModuleDetailsBox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'modules/module/DetailsBox',
} as Meta<typeof ModuleDetailsBox>

const NodeTemplate: StoryFn<typeof ModuleDetailsBox> = (args) => {
  const [node, setNode] = useState<MemoryNode>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const node = await MemoryNode.create()
      if (mounted()) {
        setNode(node)
      }
    },
    [],
  )
  return (
    <FlexCol minHeight="80vh" alignItems="stretch">
      <ModuleDetailsBox module={node} {...args} />
    </FlexCol>
  )
}

const NodeDetails = NodeTemplate.bind({})
NodeDetails.args = {}

const ArchivistTemplate: StoryFn<typeof ModuleDetailsBox> = (args) => {
  const [archivist, setArchivist] = useState<MemoryArchivist>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const archivist = await MemoryArchivist.create()
      if (mounted()) {
        setArchivist(archivist)
      }
    },
    [],
  )
  return (
    <FlexCol minHeight="80vh" alignItems="stretch">
      <ModuleDetailsBox module={archivist} {...args} />
    </FlexCol>
  )
}

const ArchivistDetails = ArchivistTemplate.bind({})
ArchivistDetails.args = {}

const DivinerTemplate: StoryFn<typeof ModuleDetailsBox> = (args) => {
  const [diviner, setDiviner] = useState<DivinerModule>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const diviner = await XyoCryptoMarketAssetDiviner.create()
      if (mounted()) {
        setDiviner(diviner)
      }
    },
    [],
  )
  return (
    <FlexCol minHeight="80vh" alignItems="stretch">
      <ModuleDetailsBox module={diviner} {...args} />
    </FlexCol>
  )
}

const DivinerDetails = DivinerTemplate.bind({})
DivinerDetails.args = {}

export { ArchivistDetails, DivinerDetails, NodeDetails }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
