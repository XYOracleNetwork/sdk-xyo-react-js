import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LinkRoundedIcon from '@mui/icons-material/LinkRounded'
import { Alert, AlertTitle, Collapse } from '@mui/material'
import { FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { QuickTipButton, QuickTipButtonProps } from '@xylabs/react-quick-tip-button'
import { ellipsize } from '@xylabs/sdk-js'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { useState } from 'react'

export interface BWPreviousHashQuickTipButtonProps extends QuickTipButtonProps {
  boundwitness?: XyoBoundWitness
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
      {previousHash !== null ? (
        <>
          <FlexGrowRow columnGap={2}>
            <pre style={{ textAlign: 'center', wordBreak: 'break-all' }}>{boundwitness?.previous_hashes.join(',')}</pre>
            <ContentCopyIcon sx={{ cursor: 'pointer' }} onClick={onCopy} />
          </FlexGrowRow>
          <FlexRow>
            <Collapse in={copied} unmountOnExit>
              <Alert>
                <AlertTitle>Previous hash copied to clipboard</AlertTitle>
              </Alert>
            </Collapse>
          </FlexRow>
        </>
      ) : null}
    </QuickTipButton>
  )
}
