/* eslint-disable import/no-internal-modules */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'

import { FlexPage } from '../../../shared/src'
import { WebAppChrome } from './WebAppChrome'

const StorybookEntry = {
  argTypes: {},
  component: WebAppChrome,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'webapp/WebAppChrome',
} as ComponentMeta<typeof WebAppChrome>

const Template: ComponentStory<typeof WebAppChrome> = (args) => {
  return (
    <FlexCol height="80vh" alignItems="stretch" overflow="hidden">
      <BrowserRouter>
        <WebAppChrome {...args}>
          <FlexPage />
        </WebAppChrome>
      </BrowserRouter>
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

export { Default }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
