import { FlexBoxProps, FlexCol, FlexGrowRow } from '@xylabs/react-flexbox'

export const TokenComparisonWrapper: React.FC<FlexBoxProps> = ({ children, ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexGrowRow>{children}</FlexGrowRow>
    </FlexCol>
  )
}
