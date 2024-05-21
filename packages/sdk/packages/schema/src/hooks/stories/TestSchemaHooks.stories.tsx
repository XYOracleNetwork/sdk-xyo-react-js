import { Alert, Button, TextField, Typography } from '@mui/material'
import { Decorator, Meta, StoryFn } from '@storybook/react'
import { Address } from '@xylabs/hex'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { HttpBridge, HttpBridgeConfigSchema } from '@xyo-network/bridge-http'
import { MemoryNode } from '@xyo-network/node-memory'
import { NodeConfigSchema } from '@xyo-network/node-model'
import { NodeProvider } from '@xyo-network/react-node'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import { useWallet, WalletProvider } from '@xyo-network/react-wallet'
import { SchemaCache } from '@xyo-network/schema-cache'
import { useState } from 'react'

import { useSchemaDefinitions } from '../useSchemaDefinitions'
import { useSchemaList } from '../useSchemaList'
import { useSchemaStats } from '../useSchemaStats'

const apiConfig = { apiDomain: 'https://api.archivist.xyo.network' }
const nodeUrl = 'http://localhost:8080/node'

const MemoryNodeDecorator: Decorator = (Story, args) => {
  const [node, setNode] = useState<MemoryNode>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const node = await MemoryNode.create({ config: { schema: NodeConfigSchema } })
      const bridge = await HttpBridge.create({ config: { nodeUrl, schema: HttpBridgeConfigSchema, security: { allowAnonymous: true } } })
      await node.register(bridge)
      await node.attach(bridge.address, true)
      setNode(node)
    },
    [],
  )

  const [wallet] = useWallet({ mnemonic: DefaultSeedPhrase })

  return (
    <WalletProvider rootWallet={wallet}>
      <NodeProvider node={node}>
        <Story {...args} />
      </NodeProvider>
    </WalletProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default {
  decorators: [MemoryNodeDecorator],
  title: 'schema/Hooks',
} as Meta

const Template: StoryFn<React.FC> = () => {
  SchemaCache.instance.proxy = `${apiConfig.apiDomain}/domain`
  const [addressText, setAddressText] = useState<Address>('')
  const [address, setAddress] = useState<Address>()
  const [schemaStats, schemaStatsError] = useSchemaStats(address)
  const [schemaList, schemaListError] = useSchemaList(address)
  const mappedSchemaList = schemaList?.schemas?.map((name) => ({ name })) as { name: string }[]
  const schemaDefinitions = useSchemaDefinitions(mappedSchemaList)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}>
      {schemaStatsError ?
        <Alert severity={'error'}>{schemaStatsError.message ?? schemaListError?.message}</Alert>
      : null}
      <FlexGrowRow columnGap={4}>
        <TextField fullWidth size="small" value={address} label="Address" onChange={(event) => setAddressText(event.target.value as Address)} />
        <Button variant="contained" onClick={() => setAddress(addressText)} sx={{ whiteSpace: 'nowrap' }}>
          Get Stats
        </Button>
      </FlexGrowRow>
      <Typography variant={'h2'}>Schema Stats</Typography>
      <code>
        <pre>{JSON.stringify(schemaStats, null, 2)}</pre>
      </code>
      <Typography variant={'h2'}>Schema List</Typography>
      <code>
        <pre>{JSON.stringify(schemaList, null, 2)}</pre>
      </code>
      <Typography variant={'h2'}>Schema Definitions</Typography>
      <pre>
        <code>{JSON.stringify(schemaDefinitions, null, 2)}</code>
      </pre>
    </div>
  )
}

const Default = Template.bind({})

export { Default }
