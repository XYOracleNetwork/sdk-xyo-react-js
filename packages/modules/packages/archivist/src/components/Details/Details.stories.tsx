import { Meta, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistModule } from '@xyo-network/archivist'
import { NodeProvider } from '@xyo-network/react-node'
import { useAppThemeDecorator } from '@xyo-network/react-storybook'
import { useState } from 'react'

import { useNodeArchivist } from '../../hooks'
import { ArchivistDetails } from './Details'

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
  const [archivist] = useNodeArchivist()

  return <ArchivistDetails address={archivist?.address} {...args}></ArchivistDetails>
}

const TemplateInnerWithData: StoryFn<typeof ArchivistDetails> = (args) => {
  const [archivist] = useNodeArchivist()
  const [archivistWithData, setArchivistWithData] = useState<ArchivistModule>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (archivist) {
        await archivist.insert([{ schema: 'network.xyo.test' }])
        if (mounted()) {
          setArchivistWithData(archivist)
        }
      }
    },
    [archivist],
  )

  return <ArchivistDetails address={archivistWithData?.address} {...args}></ArchivistDetails>
}

const TemplateWithNoData: StoryFn<typeof ArchivistDetails> = (args) => (
  <NodeProvider>
    <TemplateInner {...args}></TemplateInner>
  </NodeProvider>
)

const TemplateWithData: StoryFn<typeof ArchivistDetails> = (args) => (
  <NodeProvider>
    <TemplateInnerWithData {...args}></TemplateInnerWithData>
  </NodeProvider>
)

const WithNoArchivist = TemplateInner.bind({})
WithNoArchivist.args = {}
WithNoArchivist.decorators = [useAppThemeDecorator]

const WithNoData = TemplateWithNoData.bind({})
TemplateWithNoData.args = {}
TemplateWithNoData.decorators = [useAppThemeDecorator]

const WithData = TemplateWithData.bind({})
TemplateWithData.args = {}
TemplateWithData.decorators = [useAppThemeDecorator]

export { WithData, WithNoArchivist, WithNoData }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
