import { DecoratorFn } from '@storybook/react'
import { PayloadWrapper } from '@xyo-network/payload'
import { sampleBlock } from '@xyo-network/react-storybook'

import { HashSelectionHistoryProvider } from '../../providers'

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
