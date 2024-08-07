import { FlexRow } from '@xylabs/react-flexbox'
import React, { PropsWithChildren } from 'react'

export interface TestComponentProps extends PropsWithChildren {}

export const TestComponent: React.FC<TestComponentProps> = ({ children, ...props }) => {
  return <FlexRow {...props}>{children}</FlexRow>
}
