import { Button } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'

import { CreditCardFormFlexboxWithFormGroupProvider } from '../components/index.js'
import { CreditCardInput } from '../models/CreditCardInput.js'

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
  displayErrors: true,
  onErrorDuringSubmit: (error: Error) => console.log('onErrorDuringSubmit', error),
  onInvalidSubmit: (errorSummary) => console.log('onInvalidSubmit', errorSummary),
  onSuccessfulSubmit: () => console.log('onSuccessfulSubmit'),
  onValidSubmit: (args: CreditCardInput) => Promise.resolve(console.log('onValidSubmit', args)),
}

export { Default, WithCallbacks }
