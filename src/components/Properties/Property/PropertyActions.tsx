import { ButtonEx, FlexRow } from '@xylabs/sdk-react'

import { PropertyActionsProps } from './PropertyActionsProps'

export const PropertyActions: React.FC<PropertyActionsProps> = ({ actions, ...props }) => {
  if (actions) {
    return (
      <FlexRow {...props}>
        {actions.length > 0 ? (
          <FlexRow>
            {actions.map((action, index) => {
              return (
                <FlexRow key={index} marginRight={1}>
                  <ButtonEx disabled={action.disabled} onClick={action.onClick} variant="contained">
                    {action.name}
                  </ButtonEx>
                </FlexRow>
              )
            })}
          </FlexRow>
        ) : null}
      </FlexRow>
    )
  }
  return null
}
