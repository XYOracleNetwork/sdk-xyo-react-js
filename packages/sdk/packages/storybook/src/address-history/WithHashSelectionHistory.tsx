import { DecoratorFn } from '@storybook/react'
import { PayloadWrapper } from '@xyo-network/payload'
import { HashSelectionHistoryProvider } from '@xyo-network/react-address-history'

import { sampleBlock } from '../sampleBlock'

export const WithHashSelectionHistory: DecoratorFn = (Story, args) => {
  const hash = new PayloadWrapper(sampleBlock).hash
  const defaultHashSelectionHistory = [hash, hash]
  const defaultNestedBoundWitnesses = {
    [hash]: sampleBlock,
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
