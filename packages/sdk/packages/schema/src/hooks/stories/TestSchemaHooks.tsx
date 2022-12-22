import { Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'

import { useSchemaList } from '../useSchemaList'
import { useSchemaStats } from '../useSchemaStats'

export const TestSchemaHooks: React.FC = () => {
  const [schemaStats] = useSchemaStats('temp')
  const [schemaList] = useSchemaList('temp')

  return (
    <FlexCol rowGap={2}>
      <Typography variant={'h2'}>Schema Stats</Typography>
      <code>{JSON.stringify(schemaStats, null, 2)}</code>
      <Typography variant={'h2'}>Schema List</Typography>
      <code>{JSON.stringify(schemaList, null, 2)}</code>
    </FlexCol>
  )
}
