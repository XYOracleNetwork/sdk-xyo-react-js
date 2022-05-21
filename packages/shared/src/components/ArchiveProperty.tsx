import { TypographyProps, useTheme } from '@mui/material'
import { LinkEx } from '@xylabs/sdk-react'
import { XyoPayload } from '@xyo-network/core'
import { Property, PropertyValue } from '@xyo-network/react-property'

export interface ArchivePropertyProps extends TypographyProps {
  payload?: XyoPayload
  path?: string
}

export const ArchiveProperty: React.FC<ArchivePropertyProps> = ({ payload, path }) => {
  const theme = useTheme()
  return (
    <Property flexGrow={1} title="Archive" value={payload?._archive} tip="This archive that is storing this block">
      {path ? (
        <LinkEx to={path} display="flex" color={theme.palette.secondary.main}>
          <PropertyValue value={payload?._archive} />
        </LinkEx>
      ) : null}
    </Property>
  )
}
