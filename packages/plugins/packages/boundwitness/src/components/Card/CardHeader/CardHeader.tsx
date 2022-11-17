import { CardHeader, CardHeaderProps, styled, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { QuickTipButton } from '@xylabs/react-quick-tip-button'
import { ellipsize } from '@xylabs/sdk-js'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { EllipsizeBox } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

import { BWVerification } from './Verification'

export interface BoundWitnessCardHeaderProps extends CardHeaderProps {
  payload?: XyoPayload
  active?: boolean
  hideJSONButton?: boolean
  hideValidation?: boolean
}

export const BoundWitnessCardHeader: React.FC<BoundWitnessCardHeaderProps> = ({
  payload,
  active = false,
  hideJSONButton = false,
  hideValidation = false,
  ...props
}) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>
  const theme = useTheme()
  const [hash, setHash] = useState('')
  useEffect(() => {
    if (boundwitness) {
      setHash(new PayloadWrapper(boundwitness).hash)
    }
  }, [boundwitness])

  return (
    <CardHeaderHash
      active={active}
      title={
        <FlexRow columnGap={1}>
          <Identicon
            size={parseInt(theme.spacing(1.75).replace('px', ''))}
            p={0.25}
            value={hash}
            sx={{ background: theme.palette.background.paper }}
          />
          <EllipsizeBox flexGrow={1} lineHeight={1} typographyProps={{ title: hash }}>
            {hash}
          </EllipsizeBox>
        </FlexRow>
      }
      action={
        <FlexRow>
          {hideJSONButton ? null : <BWVerification boundwitness={boundwitness} />}
          {hideValidation ? null : (
            <QuickTipButton title={`JSON for ${ellipsize(hash, 8)}`}>
              <pre style={{ wordBreak: 'break-all' }}>{boundwitness ? JSON.stringify(boundwitness, null, 2) : null}</pre>
            </QuickTipButton>
          )}
        </FlexRow>
      }
      {...props}
    />
  )
}

interface CardHeaderHashProps extends CardHeaderProps {
  active?: boolean
}

const CardHeaderHash = styled(CardHeader, { name: 'CardHeaderHash', shouldForwardProp: (prop) => prop !== 'active' })<CardHeaderHashProps>(
  ({ theme, active }) => ({
    '& .MuiCardHeader-action': {
      marginBottom: 0,
      marginTop: 0,
    },
    '& .MuiCardHeader-content': {
      overflow: 'visible',
    },
    '&.MuiCardHeader-root': {
      backgroundColor: active ? theme.palette.info.main : theme.palette.primary.main,
      color: theme.palette.info.contrastText,
    },
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
  }),
)
