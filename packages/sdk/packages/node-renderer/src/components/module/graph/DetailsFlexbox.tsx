import CancelRoundedIcon from '@mui/icons-material/CancelRounded'
import { IconButton } from '@mui/material'
import { FlexBoxProps, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'

export interface DetailsFlexboxProps extends FlexBoxProps {
  onClose?: () => void
}

export const DetailsFlexbox: React.FC<DetailsFlexboxProps> = ({ children, onClose }) => {
  return (
    <FlexGrowCol alignItems="end" justifyContent="start" id="module-detail" width="100%" p={2} gap={2}>
      <FlexRow justifyContent="end">
        <IconButton onClick={onClose} size={'small'}>
          <CancelRoundedIcon />
        </IconButton>
      </FlexRow>
      {children}
    </FlexGrowCol>
  )
}
