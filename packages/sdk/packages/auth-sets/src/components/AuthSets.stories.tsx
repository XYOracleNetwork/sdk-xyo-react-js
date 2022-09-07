import { Menu, MenuItem } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'

import { AuthSetListItem } from './AuthSet'

// eslint-disable-next-line import/no-default-export
export default {
  component: AuthSetListItem,
  title: 'authSets/AuthSetListItem',
} as Meta

const Template: ComponentStory<typeof AuthSetListItem> = (props) => {
  return <AuthSetListItem {...props} />
}

const WithMenuItemTemplate: ComponentStory<typeof AuthSetListItem> = (props) => {
  return (
    <>
      <Menu open={true}>
        <MenuItem selected={false}>
          <AuthSetListItem {...props} />
        </MenuItem>
      </Menu>
    </>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  currentAccount: '0x12345678910',
  issuer: 'https://beta.api.archivist.xyo.network',
}

const WithMenuItem = WithMenuItemTemplate.bind({})
WithMenuItem.args = {
  currentAccount: '0x12345678910',
  issuer: 'https://beta.api.archivist.xyo.network',
}

export { Default, WithData, WithMenuItem }
