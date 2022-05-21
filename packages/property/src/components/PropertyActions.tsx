import { IconButton, Stack } from '@mui/material'
import { ButtonEx, FlexRow } from '@xylabs/sdk-react'

import { PropertyActionsProps } from './PropertyActionsProps'

export const PropertyActions: React.FC<PropertyActionsProps> = ({ actions, ...props }) => {
  if (actions) {
    return (actions?.length ?? 0) > 0 ? (
      <FlexRow {...props}>
        <Stack direction="row" spacing={1}>
          {actions.map((action, index) => {
            return action.icon ? (
              <IconButton size="small" key={index} color="secondary" onClick={action.onClick}>
                {action.icon}
              </IconButton>
            ) : (
              <ButtonEx paddingY={0} color="primary" key={index} size="small" disabled={action.disabled} onClick={action.onClick} variant="contained">
                {action.name}
              </ButtonEx>
            )
          })}
        </Stack>
      </FlexRow>
    ) : null
  }
  return null
}
