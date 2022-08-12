import { Typography } from '@mui/material'
import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'

import { XyoEmbedPluginContext, XyoEmbedPluginState } from '../XyoEmbedPluginContext'
import { ValidatePayloadProvider, ValidatePayloadProviderProps } from './Provider'
import { useValidatePayload } from './use'

const EmbedDecorator: DecoratorFn = (Story, { args }) => {
  const { xyoEmbedPluginContext, ...props } = args
  return (
    <XyoEmbedPluginContext.Provider value={xyoEmbedPluginContext}>
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
  xyoEmbedPluginContext: XyoEmbedPluginState
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
Default.args = { xyoEmbedPluginContext: XyoEmbedPluginProviderDefaultValue }

const ValidationSucceeded = Template.bind({})
ValidationSucceeded.args = { enabled: true, xyoEmbedPluginContext: { payload: ValidPayload, ...XyoEmbedPluginProviderDefaultValue } }

const ValidationFailed = Template.bind({})
ValidationFailed.args = { enabled: true, xyoEmbedPluginContext: { payload: InvalidPayload, ...XyoEmbedPluginProviderDefaultValue } }

export { Default, ValidationFailed, ValidationSucceeded }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
