/* eslint-disable import/no-internal-modules */
import { Box, Button, CircularProgress } from '@mui/material'
import { ComponentStory, DecoratorFn } from '@storybook/react'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ArchivistWrapper } from '@xyo-network/archivist-wrapper'
import { Hasher } from '@xyo-network/core'
import { MemoryArchivist, MemoryArchivistConfigSchema } from '@xyo-network/memory-archivist'
import React, { useState } from 'react'

import { PayloadProvider } from './Provider'
import { usePayload } from './use'

const testPayload = { schema: 'network.xyo.payload' }
const testPayloadHash = Hasher.hash(testPayload)

const PayloadProviderDecorator: DecoratorFn = (Story, args) => {
  const [archivist, setArchivist] = useState<ArchivistWrapper>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const memoryArchivist = await MemoryArchivist.create({ config: { schema: MemoryArchivistConfigSchema } })
      const wrapper = ArchivistWrapper.wrap(memoryArchivist)
      await memoryArchivist.insert([testPayload])
      setArchivist(wrapper)
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

const Template: ComponentStory<React.FC> = () => {
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
      {payload === undefined ? <CircularProgress /> : null}
      {payload === null ? null : null}
      {payload ? <pre>{JSON.stringify(payload, null, 2)}</pre> : null}
    </Box>
  )
}

const Default = Template.bind({})
Default.decorators = [PayloadProviderDecorator]
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
