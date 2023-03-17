import NewReleasesIcon from '@mui/icons-material/NewReleases'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import VerifiedIcon from '@mui/icons-material/Verified'
import { IconButton } from '@mui/material'
import { LinkEx } from '@xylabs/react-link'
import { useAsyncEffect } from '@xylabs/react-shared'
import { useXyoEvent, XyoEventDispatch, XyoEventNoun } from '@xyo-network/react-event'
import { Property, PropertyProps, PropertyValue } from '@xyo-network/react-property'
import { XyoSchemaCache, XyoSchemaCacheEntry } from '@xyo-network/utils'
import { forwardRef, useState } from 'react'

export type SchemaPropertyProps = PropertyProps & {
  value?: string
  /** @deprecated - use events instead */
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
    [schema],
  )
  return entry
}

export const SchemaProperty = forwardRef<HTMLDivElement, SchemaPropertyProps>(({ titleProps, value, ...props }, forwardedRef) => {
  const resolvedSchema = useResolveSchema(value)
  const [buttonRef, buttonDispatch] = useXyoEvent<HTMLButtonElement>(undefined)
  const [divRef, divDispatch] = useXyoEvent<HTMLDivElement>(undefined)

  const onClick = (dispatch?: XyoEventDispatch<XyoEventNoun, 'click', string>, openNewWindow = false) => {
    dispatch?.(
      'schema',
      'click',
      JSON.stringify({
        openNewWindow,
        schema: value,
      }),
    )
  }

  return (
    <Property ref={forwardedRef} title="Schema" value={value} tip="Schema sent with the payload" titleProps={titleProps} {...props}>
      {value ? (
        resolvedSchema === null ? (
          <IconButton ref={buttonRef} size="small" onClick={() => onClick(buttonDispatch)}>
            <NewReleasesIcon color="warning" fontSize="inherit" />
          </IconButton>
        ) : resolvedSchema === undefined ? (
          <IconButton ref={buttonRef} size="small" onClick={() => onClick(buttonDispatch)}>
            <NewReleasesIcon color="disabled" fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton rel="noopener noreferrer" size="small" target="_blank" href={resolvedSchema?.huri?.href ?? ''}>
            <VerifiedIcon color="success" fontSize="inherit" />
          </IconButton>
        )
      ) : null}
      {value ? (
        <>
          <PropertyValue ref={divRef} value={value} title="view schema" onClick={() => onClick(divDispatch)} sx={{ cursor: 'pointer' }} />
          <IconButton ref={buttonRef} size="small" onClick={() => onClick(buttonDispatch, true)}>
            <OpenInNewIcon fontSize="inherit" />
          </IconButton>
        </>
      ) : null}
    </Property>
  )
})

SchemaProperty.displayName = 'SchemaProperty'
