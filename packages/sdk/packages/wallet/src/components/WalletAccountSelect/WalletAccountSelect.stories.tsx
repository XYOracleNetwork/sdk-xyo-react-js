import { Stack } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { WalletAccountSelect } from './Select.tsx'
import { WalletProviderDecorator } from './stories/index.ts'
import {
  AccountInfo, RootWalletInfo, SelectedWalletInfo, WalletInfo,
} from './WalletInfo.tsx'

const StorybookEntry = {
  argTypes: {},
  component: WalletAccountSelect,
  decorators: [WalletProviderDecorator],
  parameters: { docs: { page: null } },
  title: 'wallet/WalletAccountSelect',
} as Meta<typeof WalletAccountSelect>

const Template: StoryFn<typeof WalletAccountSelect> = (args) => {
  return <WalletAccountSelect {...args} />
}

const WithWalletTemplate: StoryFn<typeof WalletAccountSelect> = (args) => {
  return (
    <>
      <WalletAccountSelect {...args} />
      <Stack direction="row" position="absolute" right={0} top={0} bgcolor="black" height={16}>
        <RootWalletInfo />
        <SelectedWalletInfo />
        <WalletInfo />
        <AccountInfo />
      </Stack>
    </>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithWallet = WithWalletTemplate.bind({})
WithWallet.args = {}

export { Default, WithWallet }

export default StorybookEntry
