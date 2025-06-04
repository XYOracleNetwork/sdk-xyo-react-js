import type { Decorator } from '@storybook/react-vite'
import { usePayloadHash } from '@xyo-network/react-shared'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import React from 'react'

import { HashSelectionHistoryProvider } from '../../providers/index.ts'

export const WithHashSelectionHistory: Decorator = (Story, args) => {
  return (
    <HashSelectionHistoryProvider required={false}>
      <Story {...args} />
    </HashSelectionHistoryProvider>
  )
}

export const WithHashSelectionHistoryDefaultValues: Decorator = (Story, args) => {
  const hash = usePayloadHash(sampleAddressHistory[0])
  const defaultHashSelectionHistory = hash ? [hash] : undefined
  const defaultNestedBoundWitnesses
    = hash
      ? { [hash]: sampleAddressHistory[1] }
      : undefined
  return (
    <HashSelectionHistoryProvider
      defaultHashSelectionHistory={defaultHashSelectionHistory}
      defaultNestedBoundWitnesses={defaultNestedBoundWitnesses}
      required={false}
    >
      <Story {...args} />
    </HashSelectionHistoryProvider>
  )
}
