import { DecoratorFn } from '@storybook/react'
import { Hasher } from '@xyo-network/core'
import { sampleAddressHistory } from '@xyo-network/react-storybook'

import { HashSelectionHistoryProvider } from '../../providers'

export const WithHashSelectionHistory: DecoratorFn = (Story, args) => {
  return (
    <HashSelectionHistoryProvider required={false}>
      <Story {...args} />
    </HashSelectionHistoryProvider>
  )
}

export const WithHashSelectionHistoryDefaultValues: DecoratorFn = (Story, args) => {
  const hash = Hasher.hash(sampleAddressHistory[0])
  const defaultHashSelectionHistory = [hash]
  const defaultNestedBoundWitnesses = {
    [hash]: sampleAddressHistory[1],
  }
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
