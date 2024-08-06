import { IconButton } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { PropertyActionsProps } from './ActionsProps.js'

export const PropertyActions: React.FC<PropertyActionsProps> = ({ buttons = false, actions, ...props }) => {
  if (actions) {
    return (actions?.length ?? 0) > 0
      ? (
          <FlexRow gap={1} {...props}>
            {actions.map((action, index) => {
              return (
                action.icon
                  ? (
                      <IconButton size="small" key={index} color="inherit" onClick={action.onClick}>
                        {action.icon}
                      </IconButton>
                    )
                  : buttons
                    ? (
                        <ButtonEx
                          paddingY={0}
                          color="primary"
                          key={index}
                          size="small"
                          disabled={action.disabled}
                          onClick={action.onClick}
                          variant="contained"
                        >
                          {action.name}
                        </ButtonEx>
                      )
                    : null
              )
            })}
          </FlexRow>
        )
      : null
  }
  return null
}
