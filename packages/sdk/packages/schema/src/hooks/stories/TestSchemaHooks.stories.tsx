import { Typography } from '@mui/material'
import { ComponentStory, DecoratorFn, Meta } from '@storybook/react'
import { NodeConfigSchema } from '@xyo-network/node'
import { TYPES } from '@xyo-network/node-core-types'
import { MemoryNodeProvider, useAddNamedModules } from '@xyo-network/react-node'
import { XyoSchemaCache } from '@xyo-network/utils'

import { useSchemaDefinitions } from '../useSchemaDefinitions'
import { useSchemaList } from '../useSchemaList'
import { useSchemaStats } from '../useSchemaStats'

const apiDomain = 'https://beta.api.archivist.xyo.network'

const MemoryNodeDecorator: DecoratorFn = (Story, args) => (
  <MemoryNodeProvider config={{ schema: NodeConfigSchema }}>
    <Story {...args} />
  </MemoryNodeProvider>
)

const AddModulesDecorator: DecoratorFn = (Story, args) => {
  const list = { SchemaStatsDiviner: TYPES.SchemaStatsDiviner }
  useAddNamedModules(list, { apiDomain })
  return <Story {...args} />
}

// eslint-disable-next-line import/no-default-export
export default {
  decorators: [AddModulesDecorator, MemoryNodeDecorator],
  title: 'schema/Hooks',
} as Meta

const Template: ComponentStory<React.FC> = () => {
  XyoSchemaCache.instance.proxy = `${apiDomain}/domain`
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
Default.args = {}

export { Default }
