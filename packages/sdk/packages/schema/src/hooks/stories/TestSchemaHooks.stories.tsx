import { Typography } from '@mui/material'
import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { RemoteModuleResolver } from '@xyo-network/http-proxy-module'
import { ModuleResolver } from '@xyo-network/module'
import { NodeConfigSchema } from '@xyo-network/node'
import { MemoryNodeProvider } from '@xyo-network/react-node'
import { XyoSchemaCache } from '@xyo-network/utils'
import { useState } from 'react'

import { useSchemaDefinitions } from '../useSchemaDefinitions'
import { useSchemaList } from '../useSchemaList'
import { useSchemaStats } from '../useSchemaStats'

const apiConfig = { apiDomain: 'https://beta.api.archivist.xyo.network' }

const MemoryNodeResolverDecorator: DecoratorFn = (Story, args) => {
  const [resolver, setResolver] = useState<ModuleResolver>()
  // simulate async update of apiConfig
  setTimeout(() => {
    setResolver(new RemoteModuleResolver(apiConfig))
  }, 1000)
  return (
    <MemoryNodeProvider config={{ schema: NodeConfigSchema }} resolver={resolver}>
      <Story {...args} />
    </MemoryNodeProvider>
  )
}

const MemoryNodeDecorator: DecoratorFn = (Story, args) => (
  <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
    <Story {...args} />
  </MemoryNodeProvider>
)

// eslint-disable-next-line import/no-default-export
export default {
  title: 'schema/Hooks',
} as Meta

const Template: ComponentStory<React.FC> = () => {
  XyoSchemaCache.instance.proxy = `${apiConfig.apiDomain}/domain`
  const [schemaStats] = useSchemaStats('temp')
  const [schemaList] = useSchemaList('temp')
  const schemaDefinitions = useSchemaDefinitions(schemaList)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      <Typography variant={'h2'}>Schema Stats</Typography>
      <code>{JSON.stringify(schemaStats, null, 2)}</code>
      <Typography variant={'h2'}>Schema List</Typography>
      <code>{JSON.stringify(schemaList, null, 2)}</code>
      <Typography variant={'h2'}>Schema Definitions</Typography>
      <code>{JSON.stringify(schemaDefinitions, null, 2)}</code>
    </div>
  )
}

const Default = Template.bind({})
Default.decorators = [MemoryNodeDecorator]
Default.args = {}

const WithApiConfig = Template.bind({})
WithApiConfig.decorators = [MemoryNodeResolverDecorator]

export { Default, WithApiConfig }
