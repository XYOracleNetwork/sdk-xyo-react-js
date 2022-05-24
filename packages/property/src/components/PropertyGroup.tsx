import { Divider, Typography, useTheme } from '@mui/material'
import { FlexGrowRow, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { typeOf } from '@xyo-network/core'
import { ReactElement } from 'react'

import { PropertyGroupProps } from './PropertyProps'

export const PropertyGroup: React.FC<PropertyGroupProps> = ({ border, borderColor, borderRadius, variant = 'outlined', children, title, color = 'secondary', tip, ...props }) => {
  const theme = useTheme()
  const bgcolor = color === 'primary' || color === 'secondary' ? theme.palette[color].main : color
  const childrenArray = typeOf(children) === 'array' ? (children as ReactElement[]) : undefined
  return (
    <FlexRow
      border={border ?? variant === 'outlined' ? 1 : 0}
      borderColor={borderColor ?? variant === 'outlined' ? theme.palette.divider : undefined}
      borderRadius={borderRadius ?? variant === 'outlined' ? theme.shape.borderRadius : undefined}
      overflow="hidden"
      justifyContent="flex-start"
      alignItems="stretch"
      {...props}
    >
      <FlexRow padding={1} justifyContent="start" bgcolor={bgcolor} color={theme.palette.getContrastText(bgcolor)}>
        <Typography>{title}</Typography>
        {tip ? (
          <QuickTipButton color="inherit" title={title}>
            {tip}
          </QuickTipButton>
        ) : null}
      </FlexRow>
      {childrenArray ? (
        <FlexGrowRow>
          {childrenArray?.map((child, index) => {
            return child ? (
              <FlexGrowRow key={index} borderLeft={1} borderColor={theme.palette.divider}>
                {child}
              </FlexGrowRow>
            ) : null
          })}
        </FlexGrowRow>
      ) : (
        children
      )}
    </FlexRow>
  )
}
