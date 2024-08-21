import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import type { WithChildren } from '@xylabs/react-shared'
import React, { useEffect } from 'react'

export const HideParentsFlexbox: React.FC<WithChildren & FlexBoxProps> = ({
  children, ...props
}) => {
  useEffect(() => {
    const style = document.createElement('style')
    document.head.append(style)
    style.innerHTML = `
    /** make all elements hidden */
    * {
      visibility: hidden;
    }

    /** move the preview area to the top of the page */
    #preview-area {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 9999;
    }

    /** make the preview area and all its children visible */
    #preview-area * {
      visibility: visible;
    }`

    return () => {
      style.remove()
    }
  }, [])

  return (
    <FlexGrowRow alignItems="stretch" id="preview-area" justifyContent="start" {...props}>
      {children}
    </FlexGrowRow>
  )
}
