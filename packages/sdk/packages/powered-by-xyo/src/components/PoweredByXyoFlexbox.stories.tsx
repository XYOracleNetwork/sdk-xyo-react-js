import { Meta, StoryFn } from '@storybook/react'
import { FlexCol } from '@xylabs/react-flexbox'

import { PoweredByXyoFlexbox } from './PoweredByXyoFlexBox'

const StorybookEntry = {
  component: PoweredByXyoFlexbox,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'powered-by-xyo',
} as Meta<typeof PoweredByXyoFlexbox>

const TemplateContainer: StoryFn<typeof PoweredByXyoFlexbox> = () => (
  <FlexCol height="300px" width="100%" sx={{ backgroundColor: 'grey' }}>
    <PoweredByXyoFlexbox />
  </FlexCol>
)

const Default = TemplateContainer.bind({})

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
