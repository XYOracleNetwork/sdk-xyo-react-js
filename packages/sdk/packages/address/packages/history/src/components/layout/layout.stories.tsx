import { ComponentStory, Meta } from '@storybook/react'
import { sampleAddressHistory } from '@xyo-network/react-storybook'
import { BrowserRouter } from 'react-router-dom'

import { AddressHistory } from '../AddressHistory'
import { BoundWitnessesBox } from '../BoundWitnessesBox'
import { ActiveBWDecorator, WithHashSelectionHistory, WithNestedBoundWitnessesDecorator } from '../story'
import { ScrollableGridColumn } from './Column'
import { ColumnHeadingTypography } from './ColumnHeading'
import { WrappedContainer } from './Container'
import { BlocksQuickTipButton, SelectedBlockQuickTipButton } from './QuickTips'

// eslint-disable-next-line import/no-default-export
export default {
  component: WrappedContainer,
  decorators: [ActiveBWDecorator, WithHashSelectionHistory, WithNestedBoundWitnessesDecorator],
  title: 'address/history/layout',
} as Meta

const Template: ComponentStory<typeof WrappedContainer> = (props) => {
  return (
    <BrowserRouter>
      <WrappedContainer height="calc(100vh - 2rem)" spacing={3} {...props}>
        <ScrollableGridColumn
          heading={
            <ColumnHeadingTypography>
              Blocks <BlocksQuickTipButton fontSize="inherit" address="098765432" />
            </ColumnHeadingTypography>
          }
          item
          lg={3}
          md={4}
          sm={4}
          xs={12}
        >
          <AddressHistory addressHistory={sampleAddressHistory} sx={{ py: 2 }} />
        </ScrollableGridColumn>
        <ScrollableGridColumn
          heading={
            <ColumnHeadingTypography ml={2} mr={2}>
              Active Block History <SelectedBlockQuickTipButton fontSize="inherit" boundwitnessHash="12345678" />
            </ColumnHeadingTypography>
          }
          item
          lg={9}
          md={8}
          sm={8}
          xs={12}
          scrollableProps={{
            // account for negative grid margins hiding the glow
            left: 3,
            pl: 2,
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
