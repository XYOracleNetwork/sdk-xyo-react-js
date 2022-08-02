import { FlexBoxProps, FlexCol, FlexGrowRow, WithChildren } from '@xylabs/sdk-react'

export const TokenComparisonWrapper: React.FC<WithChildren<FlexBoxProps>> = ({ children, ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexGrowRow>{children}</FlexGrowRow>
    </FlexCol>
  )
}
