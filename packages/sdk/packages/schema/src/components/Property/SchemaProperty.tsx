import {
  NewReleases as NewReleasesIcon, OpenInNew as OpenInNewIcon, Verified as VerifiedIcon,
} from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import type { EventDispatch, EventNoun } from '@xyo-network/react-event'
import { useEvent } from '@xyo-network/react-event'
import type { PropertyProps } from '@xyo-network/react-property'
import { Property, PropertyValue } from '@xyo-network/react-property'
import type { SchemaCacheEntry } from '@xyo-network/schema-cache'
import { SchemaCache } from '@xyo-network/schema-cache'
import React, { useState } from 'react'

export type SchemaPropertyProps = PropertyProps & {
  showLinkNames?: boolean
  showOpenNewWindowLink?: boolean
  showStatusIcon?: boolean
  value?: string
}

const useResolveSchema = (schema?: string) => {
  const [entry, setEntry] = useState<SchemaCacheEntry | null>()
  useAsyncEffect(
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

export const SchemaProperty: React.FC<SchemaPropertyProps> = ({
  showLinkNames = true, showOpenNewWindowLink = true, showStatusIcon = true, titleProps, value, ...props
}) => {
  const resolvedSchema = useResolveSchema(value)
  const [buttonRef, buttonDispatch] = useEvent<HTMLButtonElement>()
  const [divRef, divDispatch] = useEvent<HTMLDivElement>()

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
    <Property title="Schema" value={value} tip="Schema sent with the payload" titleProps={titleProps} {...props}>
      {value && showStatusIcon
        ? resolvedSchema === null
          ? (
              <IconButton
                ref={buttonRef}
                size="small"
                onClick={() => {
                  if (!buttonRef.current) {
                    console.warn('buttonRef.current is null')
                  }
                  onClick(buttonDispatch)
                }}
              >
                <NewReleasesIcon color="warning" fontSize="inherit" />
              </IconButton>
            )
          : resolvedSchema === undefined
            ? (
                <IconButton
                  ref={buttonRef}
                  size="small"
                  onClick={() => {
                    if (!buttonRef.current) {
                      console.warn('buttonRef.current is null')
                    }
                    onClick(buttonDispatch)
                  }}
                >
                  <NewReleasesIcon color="disabled" fontSize="inherit" />
                </IconButton>
              )
            : (
                <IconButton rel="noopener noreferrer" size="small" target="_blank" href={resolvedSchema?.huri?.href ?? ''}>
                  <VerifiedIcon color="success" fontSize="inherit" />
                </IconButton>
              )

        : null}
      {value
        ? (
            <FlexGrowRow ref={divRef} justifyContent="space-between">
              {showLinkNames
                ? (
                    <LinkEx
                      display="block"
                      width="100%"
                      sx={{ cursor: 'pointer' }}
                    >
                      <PropertyValue
                        value={value}
                        title="view schema"
                        onClick={() => {
                          if (!divRef.current) {
                            console.warn('divRef.current is null')
                          }
                          onClick(divDispatch)
                        }}
                      />
                    </LinkEx>
                  )
                : (
                    <PropertyValue
                      value={value}
                      title="view schema"
                      onClick={() => {
                        if (!divRef.current) {
                          console.warn('divRef.current is null')
                        }
                        onClick(divDispatch)
                      }}
                    />
                  )}
              {showOpenNewWindowLink
                ? (
                    <IconButton
                      ref={buttonRef}
                      size="small"
                      onClick={() => {
                        if (!buttonRef.current) {
                          console.warn('buttonRef.current is null')
                        }
                        onClick(buttonDispatch, true)
                      }}
                    >
                      <OpenInNewIcon fontSize="inherit" />
                    </IconButton>
                  )
                : null}
            </FlexGrowRow>
          )
        : null}
    </Property>
  )
}

SchemaProperty.displayName = 'SchemaProperty'
