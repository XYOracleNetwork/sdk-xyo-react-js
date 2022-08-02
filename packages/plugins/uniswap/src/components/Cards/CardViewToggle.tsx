import { Button, ButtonGroup, Typography } from '@mui/material'
import { FlexBoxProps, FlexGrowRow } from '@xylabs/sdk-react'
import { Dispatch, SetStateAction } from 'react'

import { CardViewType } from './CardViewType'

interface CardViewToggleProps extends FlexBoxProps {
  cardViewStyle: CardViewType
  setCardViewStyle: Dispatch<SetStateAction<CardViewType>>
}

export const CardViewToggle: React.FC<CardViewToggleProps> = ({ cardViewStyle, setCardViewStyle }) => {
  return (
    <FlexGrowRow paddingBottom={3} alignContent="flex-start" alignItems="start" width="100%">
      <Typography paddingRight={2} variant="h5">
        Card View
      </Typography>
      <ButtonGroup variant="contained" color="secondary" aria-label="outlined primary button group">
        <Button onClick={() => setCardViewStyle(CardViewType.Static)} sx={{ bgcolor: cardViewStyle === CardViewType.Static ? 'secondary.dark' : 'secondary' }}>
          Static
        </Button>
        <Button
          sx={{ bgcolor: cardViewStyle === CardViewType.Dynamic ? 'secondary.dark' : 'secondary' }}
          onClick={() => setCardViewStyle(CardViewType.Dynamic)}
        >
          Dynamic
        </Button>
      </ButtonGroup>
    </FlexGrowRow>
  )
}
