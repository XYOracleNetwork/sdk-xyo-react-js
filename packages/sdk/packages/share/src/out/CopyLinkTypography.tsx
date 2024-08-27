import { Cancel } from '@mui/icons-material'
import type { TypographyProps } from '@mui/material'
import { Stack, Typography } from '@mui/material'
import React, {
  useCallback, useMemo, useState,
} from 'react'

import { CopyIconButton } from './CopyIconButton.tsx'
import type { ShareLinkProps } from './lib/index.ts'

const validTLDs = new Set(['.xyo'])

const splitAroundSubstring = (path: string, substring: string): [string, string, string] => {
  // Find the index of the substring
  const index = path.indexOf(substring)

  if (index === -1) {
    throw new Error(`Substring "${substring}" not found in path.`)
  }

  // Extract the part before the substring
  const part1 = path.slice(0, index)

  // The substring itself is part2
  const part2 = substring

  // Extract the part after the substring
  const part3 = path.slice(index + substring.length)

  return [part1, part2, part3]
}

export interface CopyLinkTypographyProps extends ShareLinkProps, TypographyProps {
  linkVariant?: 'xnsName' | 'basic'
}

export const CopyLinkTypography: React.FC<CopyLinkTypographyProps> = ({
  linkVariant = 'basic', shareLinkName, shareUrl, ...props
}) => {
  const [error, setError] = useState<Error>()

  const onCopyToClipboard = useCallback((error?: Error) => {
    setError(error)
  }, [])

  const parsedXnsName = useMemo(() => {
    if (linkVariant === 'xnsName' && shareUrl) {
      const url = new URL(shareUrl)
      const pathParts = url.pathname.split('/')
      const xnsName = pathParts.find((part) => {
        if (part.includes('.')) {
          const tld = part.split('.').pop()
          return validTLDs.has(`.${tld}`)
        }
      })

      if (xnsName) {
        return splitAroundSubstring(shareUrl, xnsName)
      } else {
        setError(new Error('No XNS name found in URL'))
      }
    }
  }, [])

  const [part1, xnsName, part3] = parsedXnsName || []

  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      {linkVariant === 'basic' ? <Typography sx={{ display: 'inline-flex' }} {...props}>{shareUrl}</Typography> : null}
      {linkVariant === 'xnsName'
        ? (
            <Stack direction="row">
              <Typography sx={{ display: 'inline-flex' }} {...props}>{part1}</Typography>
              <Typography sx={{ display: 'inline-flex' }} {...props}>{xnsName}</Typography>
              <Typography sx={{ display: 'inline-flex' }} {...props}>{part3}</Typography>
            </Stack>
          )
        : null}
      <CopyIconButton onCopyToClipboard={onCopyToClipboard} shareLinkName={shareLinkName} shareUrl={shareUrl} sx={{ display: 'inline-flex' }} />
      {error ? <Cancel color="error" sx={{ display: 'inline-flex' }} /> : null}
    </Stack>
  )
}
