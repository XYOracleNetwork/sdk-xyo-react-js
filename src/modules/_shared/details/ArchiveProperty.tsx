import { TypographyProps, useTheme } from '@mui/material'
import { LinkEx } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/sdk-xyo-client-js'

import { Property, PropertyValue } from '../../property'

interface ArchiveLinkProps extends TypographyProps {
  payload?: XyoPayload
  path?: string
}

const ArchiveProperty: React.FC<ArchiveLinkProps> = ({ payload, path }) => {
  const theme = useTheme()
  return (
    <Property flexGrow={1} title="Archive" value={payload?._archive} tip="This archive that is storing this block">
      {path ? (
        <LinkEx to={path} display="flex" color={theme.palette.secondary.main}>
          <PropertyValue paddingFactor={1} value={payload?._archive} />
        </LinkEx>
      ) : null}
    </Property>
  )
}

export { ArchiveProperty }
