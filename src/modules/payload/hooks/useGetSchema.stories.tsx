import { Typography } from '@mui/material'
import { ComponentStory, Meta } from '@storybook/react'
import { FlexCol } from '@xylabs/sdk-react'
import { XyoSchemaCache } from '@xyo-network/sdk-xyo-client-js'
import { lazy, Suspense } from 'react'

import { useGetSchemaPayload } from './useGetSchema'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

XyoSchemaCache.instance.proxy = 'https://beta.api.archivist.xyo.network/domain'

const UseGetSchemaComponent: React.FC<{ schema: string }> = ({ schema }) => {
  const { schemaPayload } = useGetSchemaPayload(schema)

  return (
    <>
      <Typography variant="body1" fontWeight="bold">
        Fetches the domain config for schema: {schema}.
      </Typography>
      <FlexCol my={3}>
        <Suspense fallback={<FlexCol busy />}>
          <JsonView src={schemaPayload || {}} />
        </Suspense>
      </FlexCol>
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
  title: 'hooks/useGetSchema',
}

const Template: ComponentStory<typeof UseGetSchemaComponent> = ({ schema }) => {
  return <UseGetSchemaComponent schema={schema} />
}

const Default = Template.bind({})
Default.args = { schema: 'network.xyo.schema' }

const Domain = Template.bind({})
Domain.args = { schema: 'network.xyo.domain' }

export { Default, Domain }

// eslint-disable-next-line import/no-default-export
export default StorybookEntry
