import { Meta, StoryFn } from '@storybook/react'
import { DrawerEx, DrawerExProps } from './Drawer'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'modules/drawer/Ex',
} as Meta

const Template: StoryFn<React.FC<DrawerExProps>> = (props) => {
  return <div style={{ width: '100vw', height: 'calc(100vh - 2rem)'}}><DrawerEx {...props} /></div>
}

const Default = Template.bind({})
Default.args = {}

const WithOpen = Template.bind({})
WithOpen.args = {
  open: true
}

const WithFullScreen = Template.bind({})
WithFullScreen.args = {
  open: true,
  widthVariant: 'full',
  heightVariant: 'full'
}

const WithTitles = Template.bind({})
WithTitles.args = {
  open: true,
  title: 'Title',
  subTitle: "SubTitle"
}

export { Default, WithFullScreen, WithOpen, WithTitles }
