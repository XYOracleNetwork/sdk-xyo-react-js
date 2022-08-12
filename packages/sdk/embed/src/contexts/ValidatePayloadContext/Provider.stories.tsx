import { Typography } from '@mui/material'
import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'

import { XyoEmbedPluginContext, XyoEmbedPluginState } from '../XyoEmbedPluginContext'
import { ValidatePayloadProvider, ValidatePayloadProviderProps } from './Provider'
import { useValidatePayload } from './use'

const EmbedDecorator: DecoratorFn = (Story, { args }) => {
  const { value, ...props } = args
  return (
    <XyoEmbedPluginContext.Provider value={value}>
      <Story {...props} />
    </XyoEmbedPluginContext.Provider>
  )
}

const StorybookEntry: Meta = {
  component: ValidatePayloadProvider,
  decorators: [EmbedDecorator],
  title: 'embed/ValidatePayloadProvider',
}

const ValidatePayloadState = () => {
  const state = useValidatePayload()
  return <pre>{JSON.stringify(state, null, 2)}</pre>
}

interface ValidatePayloadProviderPropsEx extends ValidatePayloadProviderProps {
  value: XyoEmbedPluginState
}

const Template: ComponentStory<React.FC<ValidatePayloadProviderPropsEx>> = (props) => {
  return (
    <ValidatePayloadProvider {...props}>
      <Typography>State:</Typography>
      <ValidatePayloadState />
      <Typography>Children</Typography>
    </ValidatePayloadProvider>
  )
}

const InvalidPayload = { schema: 'network.xyo.schema' }
const ValidPayload = { definition: { $id: 'test.schema' }, schema: 'network.xyo.schema' }
const XyoEmbedPluginProviderDefaultValue = { provided: true }

const Default = Template.bind({})
Default.args = { value: XyoEmbedPluginProviderDefaultValue }

const ValidationSucceeded = Template.bind({})
ValidationSucceeded.args = { enabled: true, value: { payload: ValidPayload, ...XyoEmbedPluginProviderDefaultValue } }

const ValidationFailed = Template.bind({})
ValidationFailed.args = { enabled: true, value: { payload: InvalidPayload, ...XyoEmbedPluginProviderDefaultValue } }

export { Default, ValidationFailed, ValidationSucceeded }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
