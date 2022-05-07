import { IconButton } from '@mui/material'
import { ButtonEx, FlexRow } from '@xylabs/sdk-react'

import { PropertyActionsProps } from './PropertyActionsProps'

export const PropertyActions: React.FC<PropertyActionsProps> = ({ actions, ...props }) => {
  if (actions) {
    return (
      <FlexRow width="100%" {...props}>
        {actions.length > 0 ? (
          <FlexRow>
            {actions.map((action, index) => {
              return action.icon ? (
                <IconButton size="small" key={index} color="secondary" onClick={action.onClick}>
                  {action.icon}
                </IconButton>
              ) : (
                <ButtonEx color="secondary" key={index} marginRight={1} size="small" disabled={action.disabled} onClick={action.onClick} variant="contained">
                  {action.name}
                </ButtonEx>
              )
            })}
          </FlexRow>
        ) : null}
      </FlexRow>
    )
  }
  return null
}
