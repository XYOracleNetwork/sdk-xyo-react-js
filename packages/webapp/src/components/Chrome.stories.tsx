/* eslint-disable import/no-internal-modules */
import { Breadcrumbs } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LinkEx } from '@xylabs/react-common'
import { FlexCol } from '@xylabs/react-flexbox'
import { BrowserRouter } from 'react-router-dom'

import { WebAppChrome } from './Chrome'
import { WebAppPage } from './Page'

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
          <WebAppPage
            breadcrumbs={
              <Breadcrumbs>
                <LinkEx>BreadCrumbs</LinkEx>
              </Breadcrumbs>
            }
          />
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
