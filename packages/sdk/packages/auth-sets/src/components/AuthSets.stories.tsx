import { List, Menu, MenuItem } from '@mui/material'
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

const WithListTemplate: ComponentStory<typeof AuthSetListItem> = (props) => {
  return (
    <List>
      <AuthSetListItem {...props} />
      <AuthSetListItem {...props} />
      <AuthSetListItem {...props} />
    </List>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithData = Template.bind({})
WithData.args = {
  currentAccount: '0x12345678910',
  issuer: 'https://beta.api.archivist.xyo.network',
}

const WithList = WithListTemplate.bind({})
WithList.args = {
  currentAccount: '0x12345678910',
  issuer: 'https://beta.api.archivist.xyo.network',
}

export { Default, WithData, WithList }
