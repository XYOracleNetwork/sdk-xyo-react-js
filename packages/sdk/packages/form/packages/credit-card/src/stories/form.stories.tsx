import { Button } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { CreditCardFormFlexboxWithFormGroupProvider } from '../components/index.js'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'form/CreditCardForm',
} as Meta

const Template: StoryFn<React.FC> = (args) => {
  return <CreditCardFormFlexboxWithFormGroupProvider ConfirmationButton={Button} {...args} />
}

const Default = Template.bind({})
Default.args = {}

export { Default }
