import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ButtonEx } from '@xylabs/react-button'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useAsyncEffect } from '@xylabs/react-shared'
import { StorageArchivistConfigSchema } from '@xyo-network/archivist'
import { XyoPayload } from '@xyo-network/payload-model'
import { useAppThemeDecorator } from '@xyo-network/react-storybook'
import { useState } from 'react'

import { useArchivist } from '../use'
import { MemoryArchivistProvider } from './MemoryArchivistProvider'
import { StorageArchivistProvider } from './StorageArchivistProvider'

const StorybookEntry = {
  argTypes: {},
  component: StorageArchivistProvider,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'archivist/StorageArchivistProvider',
} as ComponentMeta<typeof StorageArchivistProvider>

const RenderTest: React.FC = () => {
  const { archivist } = useArchivist()
  const [items, setItems] = useState<number>()
  const [refresh, setRefresh] = useState(0)
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const items = await archivist?.all?.()
      if (mounted()) {
        setItems(items?.length)
      }
    },
    [archivist, refresh],
  )
  return (
    <FlexCol>
      Archivist Count: {items}
      <FlexRow>
        <ButtonEx
          onClick={async () => {
            await archivist?.insert([{ schema: 'network.xyo.test', value: Math.floor(Math.random() * 9999999) } as XyoPayload])
            setRefresh(refresh + 1)
          }}
        >
          Insert
        </ButtonEx>
        <ButtonEx onClick={() => setRefresh(refresh + 1)}>Refresh</ButtonEx>
        <ButtonEx
          onClick={async () => {
            await archivist?.clear?.()
            setRefresh(refresh + 1)
          }}
        >
          Clear
        </ButtonEx>
      </FlexRow>
    </FlexCol>
  )
}

const Template: ComponentStory<typeof StorageArchivistProvider> = (args) => (
  <MemoryArchivistProvider>
    <RenderTest />
    <StorageArchivistProvider {...args}>
      <RenderTest />
    </StorageArchivistProvider>
  </MemoryArchivistProvider>
)

const Default = Template.bind({})
Default.args = { config: { schema: StorageArchivistConfigSchema, writeThrough: 'true' } }
Default.decorators = [useAppThemeDecorator]

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
