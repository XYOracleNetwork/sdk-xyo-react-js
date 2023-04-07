import { Typography } from '@mui/material'
import { DecoratorFn, Meta, StoryFn } from '@storybook/react'

import { RefreshPayloadProvider } from '../RefreshPayloadContext'
import { ResolvePayloadContext, ResolvePayloadState } from '../ResolvePayloadContext'
import { XyoEmbedPluginContext, XyoEmbedPluginState } from '../XyoEmbedPluginContext'
import { ValidatePayloadProvider, ValidatePayloadProviderProps } from './Provider'
import { useValidatePayload } from './use'

const EmbedDecorator: DecoratorFn = (Story, { args }) => {
  const { xyoEmbedPluginContext, resolvePayloadContext, ...props } = args
  console.log(resolvePayloadContext)
  return (
    <RefreshPayloadProvider>
      <ResolvePayloadContext.Provider value={resolvePayloadContext}>
        <XyoEmbedPluginContext.Provider value={xyoEmbedPluginContext}>
          <Story {...props} />
        </XyoEmbedPluginContext.Provider>
      </ResolvePayloadContext.Provider>
    </RefreshPayloadProvider>
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
  resolvePayloadContext: ResolvePayloadState
  xyoEmbedPluginContext: XyoEmbedPluginState
}

const Template: StoryFn<React.FC<ValidatePayloadProviderPropsEx>> = (props) => {
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
const stubProviderDefaultValue = { provided: true }

const Default = Template.bind({})
Default.args = { resolvePayloadContext: stubProviderDefaultValue, xyoEmbedPluginContext: stubProviderDefaultValue }

const ValidationSucceeded = Template.bind({})
ValidationSucceeded.args = {
  enabled: true,
  resolvePayloadContext: { payload: ValidPayload, ...stubProviderDefaultValue },
  xyoEmbedPluginContext: stubProviderDefaultValue,
}

const ValidationFailed = Template.bind({})
ValidationFailed.args = {
  enabled: true,
  resolvePayloadContext: { payload: InvalidPayload, ...stubProviderDefaultValue },
  xyoEmbedPluginContext: stubProviderDefaultValue,
}

export { Default, ValidationFailed, ValidationSucceeded }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
