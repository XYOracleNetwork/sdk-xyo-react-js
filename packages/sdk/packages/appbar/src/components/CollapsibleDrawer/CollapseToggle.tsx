import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded'
import KeyboardDoubleArrowRightRounded from '@mui/icons-material/KeyboardDoubleArrowRightRounded'
import { IconButton } from '@mui/material'
import { FlexBoxProps, FlexRow } from '@xylabs/react-flexbox'

import { useCollapsible } from '../../contexts'

export const CollapseToggleFlex: React.FC<FlexBoxProps> = (props) => {
  const { collapse, setCollapse, setCollapseEnd } = useCollapsible()

  const handleCollapseToggle = () => {
    setCollapse?.(!collapse)
    setCollapseEnd?.((previous) => (previous ? false : previous))
  }

  return (
    <FlexRow mt={2} py={2} {...props}>
      <IconButton
        onClick={handleCollapseToggle}
        sx={{
          flexDirection: 'column',
          ml: 1,
        }}
      >
        {!collapse ? <KeyboardDoubleArrowLeftRoundedIcon /> : <KeyboardDoubleArrowRightRounded />}
      </IconButton>
    </FlexRow>
  )
}
