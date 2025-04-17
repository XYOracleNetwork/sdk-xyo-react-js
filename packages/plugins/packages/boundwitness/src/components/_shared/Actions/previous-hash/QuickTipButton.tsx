import { LinkRounded as LinkRoundedIcon } from '@mui/icons-material'
import { ellipsize } from '@xylabs/eth-address'
import type { QuickTipButtonProps } from '@xylabs/react-quick-tip-button'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import React from 'react'

import { PreviousHashDialogContent } from './DialogContent.tsx'

export interface BWPreviousHashQuickTipButtonProps extends QuickTipButtonProps {
  boundwitness?: BoundWitness
}

export const BWPreviousHashQuickTipButton: React.FC<BWPreviousHashQuickTipButtonProps> = ({ boundwitness, ...props }) => {
  const previousHash = boundwitness?.previous_hashes[0] ?? null
  const formattedPreviousHash = previousHash === null ? 'No Previous Hash' : `Previous Hash - ${ellipsize(previousHash, 8)}`

  return (
    <QuickTipButton
      Icon={LinkRoundedIcon}
      disabled={previousHash === null}
      hoverText={formattedPreviousHash}
      disableDialog={previousHash === null}
      dialogProps={{ fullWidth: true, maxWidth: 'md' }}
      {...props}
    >
      {previousHash === null
        ? null
        : <PreviousHashDialogContent boundwitness={boundwitness} />}
    </QuickTipButton>
  )
}
