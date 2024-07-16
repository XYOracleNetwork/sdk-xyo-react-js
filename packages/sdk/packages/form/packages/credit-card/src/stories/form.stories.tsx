import { Button } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { CreditCardFormFlexboxWithFormGroupProvider } from '../components/index.js'

// eslint-disable-next-line import/no-default-export
export default {
  title: 'form/CreditCardForm',
} as Meta<typeof CreditCardFormFlexboxWithFormGroupProvider>

const Template: StoryFn<typeof CreditCardFormFlexboxWithFormGroupProvider> = (args) => {
  return <CreditCardFormFlexboxWithFormGroupProvider ConfirmationButton={Button} {...args} />
}

const Default = Template.bind({})
Default.args = {}

const WithCallbacks = Template.bind({})
WithCallbacks.args = {
  onFailedSubmit: (args: unknown[]) => console.log('onFailedSubmit', args),
  onSuccessfulSubmit: () => console.log('onSuccessfulSubmit'),
  onValidSubmit: (args: unknown[]) => console.log('onValidSubmit', args),
}

export { Default, WithCallbacks }
