/* eslint-disable import/no-internal-modules */
import { Box, Button, CircularProgress } from '@mui/material'
import { Decorator, StoryFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/archivist-memory'
import { ArchivistInstance } from '@xyo-network/archivist-model'
import { usePayloadHash } from '@xyo-network/react-shared'
import React, { useState } from 'react'

import { PayloadProvider } from './Provider.js'
import { usePayload } from './use.js'

const testPayload = { schema: 'network.xyo.payload' }

const PayloadProviderDecorator: Decorator = (Story, args) => {
  const [archivist, setArchivist] = useState<ArchivistInstance>()
  const testPayloadHash = usePayloadHash(testPayload)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

const StorybookEntry = {
  title: 'payload/PayloadProvider',
}

const Template: StoryFn<React.FC> = () => {
  const { clearPayload, payload, refreshPayload } = usePayload()

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
      {payload === undefined ?
        <CircularProgress />
      : null}
      {payload === null ? null : null}
      {payload ?
        <pre>{JSON.stringify(payload, null, 2)}</pre>
      : null}
    </Box>
  )
}

const Default = Template.bind({})
Default.decorators = [PayloadProviderDecorator]
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
