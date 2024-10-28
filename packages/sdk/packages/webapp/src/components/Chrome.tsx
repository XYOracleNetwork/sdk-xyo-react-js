import { WebAppChrome, type WebAppChromeProps } from '@xylabs/react-webapp'
import { XyoApplicationAppBar } from '@xyo-network/react-appbar'
import { Footer } from '@xyo-network/react-footer'
import React, { forwardRef } from 'react'

export interface XyoWebAppChromeProps extends WebAppChromeProps {}

export const XyoWebAppChrome = forwardRef<HTMLDivElement, XyoWebAppChromeProps>(
  ({
    appbar, footer, footerElevation = 4, navigationType = 'menu', ...props
  }, ref) => {
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
  },
)

XyoWebAppChrome.displayName = 'XyoWebAppChrome'
