import { Link, Typography, TypographyProps } from '@mui/material'
import React from 'react'

export const InvalidPhraseTypography: React.FC<TypographyProps> = props => (
  <Typography variant="caption" color="error" {...props}>
    Invalid seed phrase. See -
    {' '}
    <Link target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki">
      bip39 Proposal
    </Link>
  </Typography>
)
