import { ButtonEx, FlexRow } from '@xylabs/sdk-react'

import { PropertyActionsProps } from './PropertyActionsProps'

export const PropertyActions: React.FC<PropertyActionsProps> = ({ actions, ...props }) => {
  if (actions) {
    return (
      <FlexRow width="100%" {...props}>
        {actions.length > 0 ? (
          <FlexRow>
            {actions.map((action, index) => {
              return (
                <ButtonEx key={index} marginRight={1} size="small" disabled={action.disabled} onClick={action.onClick} variant="contained">
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
