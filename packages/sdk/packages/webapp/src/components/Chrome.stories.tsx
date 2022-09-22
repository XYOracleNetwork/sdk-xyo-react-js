/* eslint-disable import/no-internal-modules */
import { Breadcrumbs, List } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FlexRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
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
    <BrowserRouter>
      <WebAppChrome
        menuItems={
          <List>
            <SiteMenuListItem primary="Hello" />
          </List>
        }
        height="calc(100vh - 2rem)"
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
  )
}

const Default = Template.bind({})
Default.args = {}

const DefaultSideBar = Template.bind({})
DefaultSideBar.args = { navigationType: 'sidebar' }

export { Default, DefaultSideBar }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
