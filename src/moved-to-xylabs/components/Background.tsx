/* eslint-disable @delagen/deprecation/deprecation */
import { FlexBoxProps, FlexRow } from './FlexBox'

/**
 * @deprecated The functionality of Background is now part of FlexBox.  Use the 'background' property to enable the background.
 */
const Background: React.FC<FlexBoxProps> = (props) => {
  return <FlexRow {...props} />
}

// eslint-disable-next-line @delagen/deprecation/deprecation
export default Background
