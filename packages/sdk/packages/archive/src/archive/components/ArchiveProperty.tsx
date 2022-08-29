import { useTheme } from '@mui/material'
import { LinkEx } from '@xylabs/react-link'
import { XyoPayloadWithPartialMeta } from '@xyo-network/payload'
import { Property, PropertyProps, PropertyValue } from '@xyo-network/react-property'

export type ArchivePropertyProps = PropertyProps & {
  payload?: XyoPayloadWithPartialMeta
  path?: string
}

export const ArchiveProperty: React.FC<ArchivePropertyProps> = ({ payload, path, ...props }) => {
  const theme = useTheme()
  return (
    <Property title="Archive" tip="This archive that is storing this payload" {...props}>
      {path ? (
        <LinkEx flexGrow={1} to={path} display="flex" color={theme.palette.secondary.main}>
          <PropertyValue value={payload?._archive} typographyVariant="body1" />
        </LinkEx>
      ) : (
        <PropertyValue value={payload?._archive} typographyVariant="body1" />
      )}
    </Property>
  )
}
