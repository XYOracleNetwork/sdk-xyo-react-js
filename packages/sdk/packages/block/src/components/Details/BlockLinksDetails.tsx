import { Button, Typography } from '@mui/material'
import { ButtonExProps } from '@xylabs/react-button'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { Property, PropertyGroup, PropertyGroupProps, XyoEvent, XyoEventNoun, XyoEventVerb } from '@xyo-network/react-property'
import { createRef, forwardRef } from 'react'

export type PreviousBlockDetailsProps = PropertyGroupProps & {
  value?: XyoBoundWitness
}

export const BlockLinksDetails: React.FC<PreviousBlockDetailsProps> = ({ value, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  const ref = createRef<HTMLButtonElement>()

  const dispatch = (noun: XyoEventNoun, verb: XyoEventVerb, data?: string) => {
    const event = new CustomEvent<XyoEvent>('xyo', { bubbles: true, cancelable: true, composed: true, detail: { data, noun, verb } })
    ref.current?.dispatchEvent(event)
  }

  const ButtonExRef = forwardRef<HTMLButtonElement, ButtonExProps>((props, ref) => (
    <Button ref={ref} onClick={() => dispatch?.('boundwitness', 'click', value?.previous_hash)} {...props}>
      <Typography fontFamily="monospace">{value?.previous_hash}</Typography>
    </Button>
  ))

  ButtonExRef.displayName = 'ButtonExRef'

  return (
    <PropertyGroup titleProps={{ elevation }} title="Links" tip="Blocks that are linked to this block" {...props}>
      <Property titleProps={{ elevation }} flexGrow={1} title="Previous Hash" tip={value?.previousHash}>
        {value?.previous_hash ? (
          <ButtonExRef
            ref={ref}
            onClick={() => {
              dispatch?.('boundwitness', 'click', value?.previous_hash)
            }}
          >
            <Typography fontFamily="monospace">{value?.previous_hash}</Typography>
          </ButtonExRef>
        ) : (
          'None'
        )}
      </Property>
    </PropertyGroup>
  )
}
