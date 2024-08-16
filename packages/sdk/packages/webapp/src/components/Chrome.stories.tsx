import { Breadcrumbs, List } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { FlexRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import { MenuListItemContainer } from '@xyo-network/react-appbar'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { WebAppChrome } from './Chrome.tsx'
import type { WebAppPageProps } from './Page.tsx'
import { WebAppPage } from './Page.tsx'

const StorybookEntry = {
  argTypes: {},
  component: WebAppChrome,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'webapp/WebAppChrome',
} as Meta<typeof WebAppChrome>

const rowArray = [32, 64, 128, 256, 512, 1024]

const Children: React.FC<WebAppPageProps> = props => (
  <WebAppPage
    breadcrumbs={(
      <Breadcrumbs>
        <LinkEx>BreadCrumbs</LinkEx>
      </Breadcrumbs>
    )}
    {...props}
  >
    {rowArray.map((height) => {
      return (
        <FlexRow key={height} height={height}>
          {height}
        </FlexRow>
      )
    })}
  </WebAppPage>
)

const Template: StoryFn<typeof WebAppChrome> = (args) => {
  return (
    <BrowserRouter>
      <WebAppChrome
        menuItems={(
          <List>
            <MenuListItemContainer primary="Hello" />
          </List>
        )}
        height="calc(100vh - 2rem)"
        {...args}
      >
      </WebAppChrome>
    </BrowserRouter>
  )
}

const Default = Template.bind({})
Default.args = {}

const DefaultSideBar = Template.bind({})
DefaultSideBar.args = { children: <Children />, navigationType: 'sidebar' }

const WithFixedSizePage = Template.bind({})
WithFixedSizePage.args = { children: <Children variant="fixed" />, navigationType: 'sidebar' }

export { Default, DefaultSideBar, WithFixedSizePage }

export default StorybookEntry
