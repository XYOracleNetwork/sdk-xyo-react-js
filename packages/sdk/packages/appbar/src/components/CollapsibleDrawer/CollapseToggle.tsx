import { Icon, useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import React, { useState } from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { VscArrowSmallLeft, VscArrowSmallRight } from 'react-icons/vsc'

import { useCollapsible } from '../../contexts/index.ts'

export const CollapseToggleFlex: React.FC<FlexBoxProps> = (props) => {
  const {
    collapse, setCollapse, setCollapseEnd,
  } = useCollapsible()
  const [hover, setHover] = useState(false)
  const theme = useTheme()

  const handleCollapseToggle = () => {
    setCollapse?.(!collapse)
    setCollapseEnd?.(previous => (previous ? false : previous))
  }

  return (
    <FlexRow mt={2} py={2} justifyContent={collapse ? 'start' : 'center'} {...props}>
      <Icon
        onClick={handleCollapseToggle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        fontSize="large"
        sx={{
          color: hover ? theme.palette.secondary.main : 'inherit', cursor: 'pointer',
        }}
      >
        {collapse
          ? <VscArrowSmallRight />
          : <VscArrowSmallLeft />}
      </Icon>
    </FlexRow>
  )
}
