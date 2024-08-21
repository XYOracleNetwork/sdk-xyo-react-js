import { FlexRow } from '@xylabs/react-flexbox'
import type { PropsWithChildren } from 'react'
import React from 'react'

export interface TestComponentProps extends PropsWithChildren {}

export const TestComponent: React.FC<TestComponentProps> = ({
  children, ...props
}) => {
  return <FlexRow {...props}>{children}</FlexRow>
}
