import NewReleasesIcon from '@mui/icons-material/NewReleases'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import VerifiedIcon from '@mui/icons-material/Verified'
import { IconButton } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { LinkEx } from '@xylabs/react-link'
import { EventDispatch, EventNoun, useEvent } from '@xyo-network/react-event'
import { Property, PropertyProps, PropertyValue } from '@xyo-network/react-property'
import { SchemaCache, SchemaCacheEntry } from '@xyo-network/schema-cache'
import { forwardRef, useState } from 'react'

export type SchemaPropertyProps = PropertyProps & {
  showLinkNames?: boolean
  showOpenNewWindowLink?: boolean
  showStatusIcon?: boolean
  value?: string
  /** @deprecated - use events instead */
  viewSchemaUrl?: string
}

const useResolveSchema = (schema?: string) => {
  const [entry, setEntry] = useState<SchemaCacheEntry | null>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (schema) {
        const entry = await SchemaCache.instance.get(schema)
        if (mounted()) {
          setEntry(entry)
        }
      }
    },
    [schema],
  )
  return entry
}

export const SchemaProperty = forwardRef<HTMLDivElement, SchemaPropertyProps>(
  ({ showLinkNames = true, showOpenNewWindowLink = true, showStatusIcon = true, titleProps, value, ...props }, forwardedRef) => {
    const resolvedSchema = useResolveSchema(value)
    const [buttonRef, buttonDispatch] = useEvent<HTMLButtonElement>(undefined)
    const [divRef, divDispatch] = useEvent<HTMLDivElement>(undefined)

    const onClick = (dispatch?: EventDispatch<EventNoun, 'click', string>, openNewWindow = false) => {
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
        {value && showStatusIcon ? (
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
            {showLinkNames ? (
              <LinkEx display="block" width="100%" sx={{ cursor: 'pointer' }}>
                <PropertyValue ref={divRef} value={value} title="view schema" onClick={() => onClick(divDispatch)} />
              </LinkEx>
            ) : (
              <PropertyValue ref={divRef} value={value} title="view schema" onClick={() => onClick(divDispatch)} />
            )}
            {showOpenNewWindowLink ? (
              <IconButton ref={buttonRef} size="small" onClick={() => onClick(buttonDispatch, true)}>
                <OpenInNewIcon fontSize="inherit" />
              </IconButton>
            ) : null}
          </>
        ) : null}
      </Property>
    )
  },
)

SchemaProperty.displayName = 'SchemaProperty'
