import { CardContent, CardContentProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

import { BoundWitnessCardBottomNavigation } from '../Navigation'

export const BoundWitnessCardContentWithNavigation: React.FC<WithChildren<CardContentProps>> = ({ children, ...props }) => {
  return (
    <CardContent {...props}>
      {children}
      <BoundWitnessCardBottomNavigation />
    </CardContent>
  )
}
