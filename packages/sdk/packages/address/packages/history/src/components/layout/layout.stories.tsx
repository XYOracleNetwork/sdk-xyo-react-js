import { ComponentStory, Meta } from '@storybook/react'

import { ScrollableGridColumn } from './Column'
import { WrappedContainer } from './Container'

// eslint-disable-next-line import/no-default-export
export default {
  component: WrappedContainer,
  title: 'address/history/layout',
} as Meta

const Template: ComponentStory<typeof WrappedContainer> = (props) => {
  return (
    <WrappedContainer spacing={3} sx={{ border: '1px solid #fff' }} {...props}>
      <ScrollableGridColumn {...{ bgcolor: 'primary', height: '80vh', item: true, lg: 3, md: 4, sm: 4, xs: 12 }}>
        <div style={{ paddingBottom: '5000px', paddingTop: '20px' }}>Left Column</div>
      </ScrollableGridColumn>
      <ScrollableGridColumn
        {...{
          item: true,
          lg: 9,
          md: 8,
          sm: 8,
          sx: { alignItems: 'center', display: 'flex', flexDirection: 'column', height: '80vh' },
          xs: 12,
        }}
      >
        <div style={{ paddingBottom: '5000px', paddingTop: '20px' }}>Right Column</div>
      </ScrollableGridColumn>
    </WrappedContainer>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }
