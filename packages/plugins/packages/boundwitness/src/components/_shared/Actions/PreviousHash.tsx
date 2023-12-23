import { ContentCopy as ContentCopyIcon, LinkRounded as LinkRoundedIcon } from '@mui/icons-material'
import { Alert, AlertTitle, Collapse } from '@mui/material'
import { ellipsize } from '@xylabs/eth-address'
import { FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton, QuickTipButtonProps } from '@xylabs/react-quick-tip-button'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { EllipsizeBox } from '@xyo-network/react-shared'
import { useState } from 'react'

export interface BWPreviousHashQuickTipButtonProps extends QuickTipButtonProps {
  boundwitness?: BoundWitness
}

export const BWPreviousHashQuickTipButton: React.FC<BWPreviousHashQuickTipButtonProps> = ({ boundwitness, ...props }) => {
  const previousHash = boundwitness?.previous_hashes[0] ?? null
  const formattedPreviousHash = previousHash === null ? 'No Previous Hash' : `Previous Hash - ${ellipsize(previousHash, 8)}`
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    await navigator.clipboard.writeText(boundwitness?.previous_hashes[0] ?? '')
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 5000)
  }

  return (
    <QuickTipButton
      Icon={LinkRoundedIcon}
      hoverText={formattedPreviousHash}
      disableDialog={previousHash === null}
      dialogProps={{ fullWidth: true, maxWidth: 'md' }}
      {...props}
    >
      {previousHash === null ? null : (
        <>
          <FlexGrowRow columnGap={2}>
            <ContentCopyIcon sx={{ cursor: 'pointer' }} onClick={onCopy} />
            <EllipsizeBox flexGrow="1" typographyProps={{ variant: 'body1' }}>
              {boundwitness?.previous_hashes.join(',')}
            </EllipsizeBox>
          </FlexGrowRow>
          <FlexRow>
            <Collapse in={copied} unmountOnExit>
              <Alert>
                <AlertTitle>Previous hash copied to clipboard</AlertTitle>
              </Alert>
            </Collapse>
          </FlexRow>
        </>
      )}
    </QuickTipButton>
  )
}
