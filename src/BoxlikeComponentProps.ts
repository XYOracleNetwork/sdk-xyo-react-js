import Margin from './Margin'
import Padding from './Padding'

type FlexValue = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'

interface BoxlikeComponentProps {
  alignContent?: FlexValue
  alignItems?: FlexValue
  alignSelf?: FlexValue
  bgcolor?: string
  border?: string
  borderColor?: string
  display?: 'block' | 'inline' | 'flex' | 'innline-block' | 'inherit'
  flexDirection?: 'row' | 'column'
  flexGrow?: number
  flexShrink?: number
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  height?: number | string
  justifyContent?: FlexValue
  justifyItems?: FlexValue
  justifySelf?: FlexValue
  margin?: Margin
  marginBottom?: Margin
  marginLeft?: Margin
  marginRight?: Margin
  marginTop?: Margin
  marginX?: Margin
  marginY?: Margin
  minHeight?: number | string
  minWidth?: number | string
  padding?: Padding
  paddingBottom?: Padding
  paddingLeft?: Padding
  paddingRight?: Padding
  paddingTop?: Padding
  paddingX?: Padding
  paddingY?: Padding
  position?: 'static' | 'absolute' | 'fixed' | 'relative' | 'sticky' | 'initial' | 'inherit'
  style?: React.CSSProperties
  width?: number | string
}

export default BoxlikeComponentProps
