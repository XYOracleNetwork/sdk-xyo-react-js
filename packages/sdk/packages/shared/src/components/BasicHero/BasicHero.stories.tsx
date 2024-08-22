import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { BasicHero } from './BasicHero.tsx'
import BackgroundImage from './default-desktop.svg'
const StorybookEntry = {
  argTypes: {},
  component: BasicHero,
  parameters: { docs: { page: null } },
  title: 'shared/BasicHero',
} as Meta<typeof BasicHero>

const Template: StoryFn<typeof BasicHero> = args => (
  <BrowserRouter>
    <BasicHero {...args}></BasicHero>
  </BrowserRouter>
)

const Default = Template.bind({})
Default.args = {
  button1Text: 'Button 1',
  button1To: '',
  button2Text: 'Button 2',
  button2To: '',
  desc: ' Ipsam illo molestiae nisi perferendis a error, eum repellendus voluptatibus, provident, voluptatum qui laborum assumenda minus!',
  gradientTitle: 'dolor',
  subLinkPath: 'https://medium.com/xyonetwork/xyo-2-0-has-arrived-fe160f8b2928',
  subLinkText1: 'We just announced XYO 2.0',
  subLinkText2: 'Read more here.',
  title: 'Lorem ipsum',
}
const WithBackgroundImage = Template.bind({})
WithBackgroundImage.args = {
  backgroundImage: BackgroundImage,
  button1Text: 'Button 1',
  button1To: '',
  button2Text: 'Button 2',
  button2To: '',
  desc: ' Ipsam illo molestiae nisi perferendis a error, eum repellendus voluptatibus, provident, voluptatum qui laborum assumenda minus!',
  gradientTitle: 'dolor',
  subLinkPath: 'https://medium.com/xyonetwork/xyo-2-0-has-arrived-fe160f8b2928',
  subLinkText1: 'We just announced XYO 2.0',
  subLinkText2: 'Read more here.',
  title: 'Lorem ipsum',
  title2: 'adipisicing elit.',
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

export { Default, WithBackgroundImage }

export default StorybookEntry
