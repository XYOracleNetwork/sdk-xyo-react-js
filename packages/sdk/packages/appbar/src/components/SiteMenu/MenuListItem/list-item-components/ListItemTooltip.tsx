import { Tooltip, TooltipProps } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { VscInfo } from 'react-icons/vsc'

export interface ListItemTooltipProps extends Omit<TooltipProps, 'children'> {
  title: string
}

export const ListItemTooltip: React.FC<ListItemTooltipProps> = ({ title, ...props }) => {
  return (
    <Tooltip title={title} placement="right" {...props}>
      {/* Needs div so it can work, the hovering doesn't work with a FlexCol */}
      <div>
        <FlexCol justifyContent="center">
          <VscInfo color="grey" />
        </FlexCol>
      </div>
    </Tooltip>
  )
}
