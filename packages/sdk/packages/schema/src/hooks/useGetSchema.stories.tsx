import { FormControl, TextField, Typography } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { FlexRow } from '@xylabs/react-flexbox'
import { SchemaCache } from '@xyo-network/schema-cache'
import { useEffect, useState } from 'react'
import { JsonViewerEx } from '@xyo-network/react-payload-raw-info'

import { useGetSchemaPayload } from './useGetSchema'

SchemaCache.instance.proxy = 'https://beta.api.archivist.xyo.network/domain'

const UseGetSchemaComponent: React.FC<{ schema: string }> = ({ schema }) => {
  const exampleSchemas = ['network.xyo.domain', 'network.xyo.payload', 'network.xyo.schema']
  const [schemaFieldValue, setSchemaFieldValue] = useState('')
  const { schemaPayload } = useGetSchemaPayload(schemaFieldValue)

  useEffect(() => {
    if (schema) {
      setSchemaFieldValue(schema)
    }
  }, [schema])

  return (
    <>
      <Typography variant="body1" fontWeight="bold" mb={2}>
        Example schemas to test:
        {exampleSchemas.map((schema, index) => (
          <Typography
            component="span"
            mx={1}
            key={index}
            onClick={() => setSchemaFieldValue(schema)}
            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {schema}
          </Typography>
        ))}
      </Typography>
      <FormControl>
        <TextField value={schemaFieldValue} label="Schema Name" onChange={(e) => setSchemaFieldValue(e.target.value)} />
      </FormControl>
      <FlexRow my={3} justifyContent="start">
          <JsonViewerEx value={schemaPayload || {}} />
      </FlexRow>
    </>
  )
}

const StorybookEntry: Meta = {
  argTypes: {},
  component: UseGetSchemaComponent,
  parameters: {
    docs: {
      page: null,
    },
  },
  title: 'payload/useGetSchema',
}

const Template: StoryFn<typeof UseGetSchemaComponent> = ({ schema }) => {
  return <UseGetSchemaComponent schema={schema} />
}

const Default = Template.bind({})
Default.args = { schema: 'network.xyo.schema' }

const Domain = Template.bind({})
Domain.args = { schema: 'network.xyo.domain' }

export { Default, Domain }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
