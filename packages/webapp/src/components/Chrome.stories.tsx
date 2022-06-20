/* eslint-disable import/no-internal-modules */
import { Breadcrumbs, List } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { LinkEx } from '@xylabs/react-common'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { SiteMenuListItem } from '@xyo-network/react-appbar'
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

const rowArray = [32, 64, 128, 256, 512, 1024]

const Template: ComponentStory<typeof WebAppChrome> = (args) => {
  return (
    <FlexCol height="80vh" alignItems="stretch" overflow="hidden">
      <BrowserRouter>
        <WebAppChrome
          menuItems={
            <List>
              <SiteMenuListItem primary="Hello" />
            </List>
          }
          {...args}
        >
          <WebAppPage
            breadcrumbs={
              <Breadcrumbs>
                <LinkEx>BreadCrumbs</LinkEx>
              </Breadcrumbs>
            }
          >
            {rowArray.map((height) => {
              return (
                <FlexRow key={height} height={height}>
                  {height}
                </FlexRow>
              )
            })}
          </WebAppPage>
        </WebAppChrome>
      </BrowserRouter>
    </FlexCol>
  )
}

const Default = Template.bind({})
Default.args = {}

const DefaultSideBar = Template.bind({})
DefaultSideBar.args = { navigationType: 'sidebar' }

export { Default, DefaultSideBar }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
