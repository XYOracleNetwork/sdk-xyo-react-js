import type { Meta, StoryFn } from '@storybook/react-vite'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ArchivistModuleInstance } from '@xyo-network/archivist-model'
import { asSchema } from '@xyo-network/payload-model'
import { NodeProvider } from '@xyo-network/react-node'
import type { FC } from 'react'
import React, { useState } from 'react'

import { useWeakArchivistFromNode } from '../../hooks/index.ts'
import type { ArchivistDetailsProps } from './Details.tsx'
import { ArchivistDetails } from './Details.tsx'

const StorybookEntry = {
  argTypes: {},
  component: ArchivistDetails,
  parameters: { docs: { page: null } },
  title: 'modules/archivist/Details',
} as Meta<typeof ArchivistDetails>

const TemplateInner: StoryFn<typeof ArchivistDetails> = (args) => {
  const [archivist] = useWeakArchivistFromNode()

  return <ArchivistDetails address={archivist?.deref()?.address} {...args}></ArchivistDetails>
}

const TemplateInnerWithData: StoryFn<typeof ArchivistDetails> = (args) => {
  const [archivist] = useWeakArchivistFromNode()
  const [archivistWithData, setArchivistWithData] = useState<ArchivistModuleInstance>()

  useAsyncEffect(
    async (mounted) => {
      if (archivist?.deref()) {
        await archivist.deref()?.insert([{ schema: asSchema('network.xyo.test', true) }])
        if (mounted()) {
          setArchivistWithData(archivist.deref())
        }
      }
    },
    [archivist],
  )

  return <ArchivistDetails address={archivistWithData?.address} {...args}></ArchivistDetails>
}

const TemplateInnerComponent = TemplateInner as FC<ArchivistDetailsProps>

const TemplateWithNoData: StoryFn<typeof ArchivistDetails> = args => (
  <NodeProvider>
    <TemplateInnerComponent {...args}></TemplateInnerComponent>
  </NodeProvider>
)

const TemplateInnerWithDataComponent = TemplateInnerWithData as FC<ArchivistDetailsProps>

const TemplateWithData: StoryFn<typeof ArchivistDetails> = args => (
  <NodeProvider>
    <TemplateInnerWithDataComponent {...args}></TemplateInnerWithDataComponent>
  </NodeProvider>
)

const WithNoArchivist = TemplateInner.bind({})
WithNoArchivist.args = {}

const WithNoData = TemplateWithNoData.bind({})
TemplateWithNoData.args = {}

const WithData = TemplateWithData.bind({})
TemplateWithData.args = {}

export {
  WithData, WithNoArchivist, WithNoData,
}

export default StorybookEntry
