import type { Meta, StoryFn } from '@storybook/react'
import { useEvent } from '@xyo-network/react-event'
import { usePayloadHashes } from '@xyo-network/react-shared'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { useActiveBoundWitness } from '../../hooks/index.ts'
import { AddressHistory } from '../AddressHistory/index.ts'
import { BoundWitnessesBox } from '../BoundWitnessesBox/index.ts'
import {
  ActiveBWDecorator, WithHashSelectionHistory, WithNestedBoundWitnessesDecorator,
} from '../stories/index.ts'
import { ScrollableGridColumn } from './Column.tsx'
import { ColumnHeadingTypography } from './ColumnHeading.tsx'
import { WrappedContainer } from './Container.tsx'
import { BlocksQuickTipButton, SelectedBlockQuickTipButton } from './QuickTips.tsx'

export default {
  component: WrappedContainer,
  decorators: [ActiveBWDecorator, WithHashSelectionHistory, WithNestedBoundWitnessesDecorator],
  title: 'address/history/layout',
} as Meta

const Template: StoryFn<typeof WrappedContainer> = (props) => {
  const { setActiveBoundWitness } = useActiveBoundWitness()
  const sampleAddressHistoryPairs = usePayloadHashes(sampleAddressHistory)
  const [ref] = useEvent<HTMLUListElement>((noun, _verb, data) => {
    if (noun === 'boundwitness' && data) {
      const found = sampleAddressHistoryPairs?.find(([_, hash]) => hash === data)?.[0]
      setActiveBoundWitness?.(found)
    }
  })
  return (
    <BrowserRouter>
      <WrappedContainer height="calc(100vh - 2rem)" spacing={3} {...props}>
        <ScrollableGridColumn
          heading={(
            <ColumnHeadingTypography mr={2}>
              Blocks
              {' '}
              <BlocksQuickTipButton fontSize="inherit" address="098765432" />
            </ColumnHeadingTypography>
          )}
          item
          lg={3}
          md={4}
          sm={4}
          xs={12}
        >
          <AddressHistory
            ref={ref}
            addressHistory={sampleAddressHistory}
            sx={{ pr: 2, py: 2 }}
          />
        </ScrollableGridColumn>
        <ScrollableGridColumn
          heading={(
            <ColumnHeadingTypography ml={2} mr={2}>
              Active Block History
              {' '}
              <SelectedBlockQuickTipButton fontSize="inherit" boundwitnessHash="12345678" />
            </ColumnHeadingTypography>
          )}
          item
          lg={9}
          md={8}
          sm={8}
          xs={12}
          scrollableProps={{
            // account for negative grid margins hiding the glow
            left: 3,
            pl: 1,
            pr: 2,
            pt: 2,
          }}
        >
          <BoundWitnessesBox pb={2} />
        </ScrollableGridColumn>
      </WrappedContainer>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }
