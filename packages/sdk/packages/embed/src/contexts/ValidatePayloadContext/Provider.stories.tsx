import { Typography } from '@mui/material'
import { Decorator, Meta, StoryFn } from '@storybook/react'
import React from 'react'

import { EmbedPluginContext, EmbedPluginState } from '../EmbedPluginContext/index.js'
import { RefreshPayloadProvider } from '../RefreshPayloadContext/index.js'
import { ResolvePayloadContext, ResolvePayloadState } from '../ResolvePayloadContext/index.js'
import { ValidatePayloadProvider, ValidatePayloadProviderProps } from './Provider.js'
import { useValidatePayload } from './use.js'

const EmbedDecorator: Decorator<ValidatePayloadProviderPropsEx> = (Story, { args }) => {
  const { xyoEmbedPluginContext, resolvePayloadContext, ...props } = args
  console.log(resolvePayloadContext)
  return (
    <RefreshPayloadProvider>
      <ResolvePayloadContext.Provider value={resolvePayloadContext}>
        <EmbedPluginContext.Provider value={xyoEmbedPluginContext}>
          <Story {...props} />
        </EmbedPluginContext.Provider>
      </ResolvePayloadContext.Provider>
    </RefreshPayloadProvider>
  )
}

const StorybookEntry: Meta<ValidatePayloadProviderPropsEx> = {
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
  xyoEmbedPluginContext: EmbedPluginState
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

export default StorybookEntry
