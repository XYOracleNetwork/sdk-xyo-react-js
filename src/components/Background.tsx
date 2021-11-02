import { FlexBoxProps, FlexRow } from './FlexBox'

/**
 * @deprecated The functionality of Background is now part of FlexBox.  Use the 'background' property to enable the background.
 */
const Background: React.FC<FlexBoxProps> = (props) => {
  return <FlexRow {...props} />
}

export default Background
