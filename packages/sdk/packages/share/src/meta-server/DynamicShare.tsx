import React from 'react'
import { Helmet } from 'react-helmet'

/**
 * The props for the DynamicShareImage component.
 */
export interface DynamicShareImageProps {
  /**
   * The URL of the share image for the page.
   */
  image: string
}

/**
 * Used in conjunction with the XY Meta Server to dynamically set the share image for a page.
 */
export const DynamicShareImage: React.FC<DynamicShareImageProps> = ({ image }) => {
  return (
    <Helmet>
      <meta property="xyo:og:image" content={image} />
    </Helmet>
  )
}
