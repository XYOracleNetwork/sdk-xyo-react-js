import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-shared'
import { ArchivistModule } from '@xyo-network/archivist'
import { useAppThemeDecorator } from '@xyo-network/react-storybook'
import { useState } from 'react'

import { MemoryArchivistProvider, useArchivist } from '../contexts'
import { ArchivistDetails } from './Details'

const StorybookEntry = {
  argTypes: {},
  component: ArchivistDetails,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archivist/Details',
} as ComponentMeta<typeof ArchivistDetails>

const TemplateInner: ComponentStory<typeof ArchivistDetails> = (args) => {
  const archivist = useArchivist()

  return <ArchivistDetails address={archivist?.address} {...args}></ArchivistDetails>
}

const TemplateInnerWithData: ComponentStory<typeof ArchivistDetails> = (args) => {
  const archivist = useArchivist()
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

const TemplateWithNoData: ComponentStory<typeof ArchivistDetails> = (args) => (
  <MemoryArchivistProvider>
    <TemplateInner {...args}></TemplateInner>
  </MemoryArchivistProvider>
)

const TemplateWithData: ComponentStory<typeof ArchivistDetails> = (args) => (
  <MemoryArchivistProvider>
    <TemplateInnerWithData {...args}></TemplateInnerWithData>
  </MemoryArchivistProvider>
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
