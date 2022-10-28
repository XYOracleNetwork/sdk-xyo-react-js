import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { XyoPayloads } from '@xyo-network/payload'

export interface ArchivistPayloadsProps {
  refresh?: () => void
  payloads?: XyoPayloads
  error?: Error
}

export const ArchivistPayloads: React.FC<ArchivistPayloadsProps> = ({ refresh, payloads, error }) => {
  return (
    <FlexCol rowGap={2}>
      <Button variant="contained" onClick={() => refresh?.()}>
        Refresh
      </Button>
      <Card>
        <CardHeader title="Payloads" />
        <CardContent>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{payloads ? JSON.stringify(payloads, null, 2) : null}</pre>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Errors" />
        <CardContent>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{error ? JSON.stringify(error, null, 2) : null}</pre>
        </CardContent>
      </Card>
    </FlexCol>
  )
}
