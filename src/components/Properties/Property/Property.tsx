import { CircularProgress, useTheme } from '@mui/material'
import { FlexGrowRow, FlexRow } from '@xylabs/sdk-react'

import { PropertyActions } from './PropertyActions'
import { PropertyProps } from './PropertyProps'
import { PropertyTitle } from './PropertyTitle'
import { Value } from './Value'

const Property: React.FC<PropertyProps> = (props) => {
  const theme = useTheme()
  const { title, value, children, maxTitleWidth = 180, tip, actions, required, ...boxProps } = props

  return (
    <FlexRow
      margin={0.5}
      border={1}
      borderColor={required && value === undefined ? theme.palette.error.main : theme.palette.divider}
      borderRadius={1}
      {...boxProps}
    >
      <FlexRow minHeight={56} alignItems="stretch">
        {title ? <PropertyTitle maxWidth={maxTitleWidth} tip={tip} title={title} /> : null}
      </FlexRow>
      <FlexRow flexGrow={1} minHeight={56} alignItems="stretch">
        {value === undefined ? (
          <FlexRow paddingX={2}>
            <CircularProgress size={16} />
          </FlexRow>
        ) : (
          <FlexGrowRow justifyContent="space-between" paddingX={2}>
            {children ? children : <Value value={value} />}
            <PropertyActions actions={actions} marginX={2} />
          </FlexGrowRow>
        )}
      </FlexRow>
    </FlexRow>
  )
}

export { Property }
