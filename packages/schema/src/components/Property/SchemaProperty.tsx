import NewReleasesIcon from '@mui/icons-material/NewReleases'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import VerifiedIcon from '@mui/icons-material/Verified'
import { IconButton } from '@mui/material'
import { LinkEx, useAsyncEffect } from '@xylabs/sdk-react'
import { Property, PropertyProps, PropertyValue } from '@xyo-network/react-property'
import { XyoSchemaCache, XyoSchemaCacheEntry } from '@xyo-network/utils'
import { useState } from 'react'

export type SchemaPropertyProps = PropertyProps & {
  value?: string
  viewSchemaUrl?: string
}

const useResolveSchema = (schema?: string) => {
  const [entry, setEntry] = useState<XyoSchemaCacheEntry | null>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (schema) {
        const entry = await XyoSchemaCache.instance.get(schema)
        if (mounted()) {
          setEntry(entry)
        }
      }
    },
    [schema]
  )
  return entry
}

export const SchemaProperty: React.FC<SchemaPropertyProps> = ({ titleProps, value, viewSchemaUrl = 'https://explore.xyo.network/', ...props }) => {
  const resolvedSchema = useResolveSchema(value)
  return (
    <Property title="Schema" value={value} tip="Schema sent with the payload" titleProps={titleProps} {...props}>
      {value ? (
        resolvedSchema === null ? (
          <IconButton rel="noopener noreferrer" size="small" target="_blank" href={`${viewSchemaUrl}${value}`}>
            <NewReleasesIcon color="warning" fontSize="inherit" />
          </IconButton>
        ) : resolvedSchema === undefined ? (
          <IconButton rel="noopener noreferrer" size="small" target="_blank" href={`${viewSchemaUrl}${value}`}>
            <NewReleasesIcon color="disabled" fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton rel="noopener noreferrer" size="small" target="_blank" href={resolvedSchema?.huri?.href ?? ''}>
            <VerifiedIcon color="success" fontSize="inherit" />
          </IconButton>
        )
      ) : null}
      {value ? (
        <LinkEx flexGrow={1} alignItems="center" href={`${viewSchemaUrl}${value}`} rel="noopener noreferrer" display="flex">
          <PropertyValue value={value} title="view schema in new window" />
        </LinkEx>
      ) : null}
      {value ? (
        <LinkEx marginX={1} alignItems="center" href={`${viewSchemaUrl}${value}`} target="_blank" rel="noopener noreferrer" display="flex">
          <OpenInNewIcon fontSize="inherit" />
        </LinkEx>
      ) : null}
    </Property>
  )
}
