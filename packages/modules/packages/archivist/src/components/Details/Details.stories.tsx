import type { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ArchivistModule } from '@xyo-network/archivist-model'
import { NodeProvider } from '@xyo-network/react-node'
import React, { useState } from 'react'

import { useWeakArchivistFromNode } from '../../hooks/index.ts'
import { ArchivistDetails } from './Details.tsx'

const StorybookEntry = {
  argTypes: {},
  component: ArchivistDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'modules/archivist/Details',
} as Meta<typeof ArchivistDetails>

const TemplateInner: StoryFn<typeof ArchivistDetails> = (args) => {
  const [archivist] = useWeakArchivistFromNode()

  return <ArchivistDetails address={archivist?.deref()?.address} {...args}></ArchivistDetails>
}

const TemplateInnerWithData: StoryFn<typeof ArchivistDetails> = (args) => {
  const [archivist] = useWeakArchivistFromNode()
  const [archivistWithData, setArchivistWithData] = useState<ArchivistModule>()

  useAsyncEffect(
    async (mounted) => {
      if (archivist?.deref()) {
        await archivist.deref()?.insert([{ schema: 'network.xyo.test' }])
        if (mounted()) {
          setArchivistWithData(archivist.deref())
        }
      }
    },
    [archivist],
  )

  return <ArchivistDetails address={archivistWithData?.address} {...args}></ArchivistDetails>
}

const TemplateWithNoData: StoryFn<typeof ArchivistDetails> = args => (
  <NodeProvider>
    <TemplateInner {...args}></TemplateInner>
  </NodeProvider>
)

const TemplateWithData: StoryFn<typeof ArchivistDetails> = args => (
  <NodeProvider>
    <TemplateInnerWithData {...args}></TemplateInnerWithData>
  </NodeProvider>
)

const WithNoArchivist = TemplateInner.bind({})
WithNoArchivist.args = {}

const WithNoData = TemplateWithNoData.bind({})
TemplateWithNoData.args = {}

const WithData = TemplateWithData.bind({})
TemplateWithData.args = {}

export { WithData, WithNoArchivist, WithNoData }

export default StorybookEntry
