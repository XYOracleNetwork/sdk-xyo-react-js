import { Tooltip, TooltipProps } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import { VscInfo } from 'react-icons/vsc/index'

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
