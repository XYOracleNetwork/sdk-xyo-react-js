import { InfoOutlined } from '@mui/icons-material'
import { Tooltip, Typography, useTheme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import React from 'react'

export interface ShareOutExplanationProps {
  toolTipTitle?: string
}

export const ShareOutExplanation: React.FC<ShareOutExplanationProps> = ({ toolTipTitle }) => {
  const theme = useTheme()
  const title = toolTipTitle ?? 'In order for your data to be publicly viewable, it needs to be saved to the XYO Network Public Archivist.  Public data can be seen by your friends, and XYO can generate preview images for easier sharing on social media.'
  return (
    <>
      <FlexGrowRow alignItems="center">
        <Typography variant="body2" paddingRight={0.5}>
          What am I sharing?
        </Typography>
        <Tooltip
          title={title}
          placement="bottom"
        >
          <InfoOutlined fontSize="small" sx={{ fontSize: theme.typography.caption.fontSize }} />
        </Tooltip>
      </FlexGrowRow>
    </>
  )
}
