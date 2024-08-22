import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import type { DrawerExProps } from './Drawer.tsx'
import { DrawerEx } from './Drawer.tsx'

export default { title: 'modules/drawer/Ex' } as Meta

const Template: StoryFn<React.FC<DrawerExProps>> = (props) => {
  return (
    <div style={{ height: 'calc(100vh - 2rem)', width: '100vw' }}>
      <DrawerEx {...props} />
    </div>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithOpen = Template.bind({})
WithOpen.args = { open: true }

const WithFullScreen = Template.bind({})
WithFullScreen.args = {
  heightVariant: 'full',
  open: true,
  widthVariant: 'full',
}

const WithTitles = Template.bind({})
WithTitles.args = {
  open: true,
  subTitle: 'SubTitle',
  title: 'Title',
}

export {
  Default, WithFullScreen, WithOpen, WithTitles,
}
