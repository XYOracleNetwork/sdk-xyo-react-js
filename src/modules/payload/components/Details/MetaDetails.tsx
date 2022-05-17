import { Typography, TypographyProps, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, LinkEx, QuickTipButton } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { Property, PropertyValue } from '../../../property'

interface ArchiveListProps extends TypographyProps {
  archiveName?: string
  path?: string
}

const ArchiveLink: React.FC<ArchiveListProps> = ({ archiveName, path }) => {
  const theme = useTheme()
  return (
    <LinkEx to={path} display="flex" color={theme.palette.secondary.main}>
      <PropertyValue paddingFactor={1} value={archiveName} />
    </LinkEx>
  )
}

export interface PayloadMetaDetailsProps extends FlexBoxProps {
  value?: XyoPayload
  archivePath?: string
}

export const PayloadMetaDetails: React.FC<PayloadMetaDetailsProps> = ({ archivePath, value, ...props }) => {
  return (
    <FlexCol alignItems="start" {...props}>
      <FlexRow margin={1} justifyContent="start">
        <Typography>Meta</Typography>
        <QuickTipButton title="Payload Meta">The meta fields added to the record by the archivist</QuickTipButton>
      </FlexRow>
      <FlexRow flexWrap="wrap">
        {value?._client ? <Property flexGrow={1} title="Client" value={value?._client ?? '<Unknown>'} tip="This client used to create this payload" /> : null}
        {value?._archive ? (
          <Property flexGrow={1} title="Archive" value={value?._archive} tip="This archive that is storing this payload">
            {archivePath ? <ArchiveLink archiveName={value._archive} path={archivePath} /> : null}
          </Property>
        ) : null}
        {value?._reportedHash ? <Property flexGrow={1} title="Reported Hash" value={value?._reportedHash ?? '<Unknown>'} tip="The has reported by the payload" /> : null}
        {value?._timestamp ? <Property flexGrow={1} title="Timestamp" value={value?._timestamp ?? '<Unknown>'} tip="This timestamp of the payload" /> : null}
        {value?._observeDuration ? (
          <Property flexGrow={1} title="Observation Duration" value={value?._observeDuration ?? '<Unknown>'} tip="This duration of time observed by the witness" />
        ) : null}
      </FlexRow>
    </FlexCol>
  )
}
