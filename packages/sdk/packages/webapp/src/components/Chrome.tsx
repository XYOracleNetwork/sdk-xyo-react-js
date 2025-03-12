import { WebAppChrome, type WebAppChromeProps } from '@xylabs/react-webapp'
import { XyoApplicationAppBar } from '@xyo-network/react-appbar'
import { Footer } from '@xyo-network/react-footer'
import React from 'react'

export interface XyoWebAppChromeProps extends WebAppChromeProps {}

export const XyoWebAppChrome = ({
  ref, appbar, footer, footerElevation = 4, navigationType = 'menu', ...props
}: XyoWebAppChromeProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  return (
    <WebAppChrome
      ref={ref}
      appbar={appbar ?? <XyoApplicationAppBar />}
      footerElevation={footerElevation}
      navigationType={navigationType}
      footer={footer ?? <Footer dynamicHeight />}
      {...props}
    />
  )
}

XyoWebAppChrome.displayName = 'XyoWebAppChrome'
