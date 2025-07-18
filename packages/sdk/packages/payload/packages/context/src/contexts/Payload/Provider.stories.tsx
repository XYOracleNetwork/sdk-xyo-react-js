import {
  Box, Button, CircularProgress,
} from '@mui/material'
import type { Decorator, StoryFn } from '@storybook/react-vite'
import { usePromise } from '@xylabs/react-promise'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist-memory'
import type { ArchivistInstance } from '@xyo-network/archivist-model'
import { usePayloadHash } from '@xyo-network/react-shared'
import React, { useState } from 'react'

import { PayloadProvider } from './Provider.tsx'
import { usePayload } from './use.ts'

const testPayload = { schema: 'network.xyo.payload' }

const PayloadProviderDecorator: Decorator = (Story, args) => {
  const [archivist, setArchivist] = useState<ArchivistInstance>()
  const testPayloadHash = usePayloadHash(testPayload)

  usePromise(
    async () => {
      const memoryArchivist = await MemoryArchivist.create({ config: { schema: MemoryArchivistConfigSchema } })
      await memoryArchivist.insert([testPayload])
      setArchivist(memoryArchivist)
    },
    [],
  )

  return (
    <PayloadProvider archivist={archivist} hash={testPayloadHash}>
      <Story {...args} />
    </PayloadProvider>
  )
}

const StorybookEntry = { title: 'payload/PayloadProvider' }

const Template: StoryFn<React.FC> = () => {
  const {
    clearPayload, payload, refreshPayload,
  } = usePayload()

  const handleRefresh = () => {
    refreshPayload?.()
  }

  const handleClear = () => {
    clearPayload?.()
  }

  return (
    <Box display="flex" flexDirection="column" rowGap={3}>
      <Button variant="contained" onClick={handleRefresh}>
        Refresh Payload
      </Button>
      <Button variant="contained" onClick={handleClear}>
        Clear Payload
      </Button>
      {payload === undefined
        ? <CircularProgress />
        : null}
      {payload
        ? <pre>{JSON.stringify(payload, null, 2)}</pre>
        : null}
    </Box>
  )
}

const Default = Template.bind({})
Default.decorators = [PayloadProviderDecorator]
Default.args = {}

export { Default }

export default StorybookEntry
