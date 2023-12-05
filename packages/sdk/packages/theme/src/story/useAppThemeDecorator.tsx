import { Decorator } from '@storybook/react'
import { merge } from '@xylabs/lodash'
import { InvertibleThemeProvider } from '@xylabs/react-invertible-theme'
import { useDarkMode } from 'storybook-dark-mode'

import { appThemeOptions } from '../appThemeOptions'
import { partialAppDarkThemeOptions } from '../partialDarkThemeOptions'
import { partialAppLightThemeOptions } from '../partialLightThemeOptions'
import { themeOptions } from '../themeOptions'

export const useAppThemeDecorator: Decorator = (Story, { args }) => {
  const darkMode = useDarkMode()
  const mergedThemeOptions = merge(themeOptions, appThemeOptions)
  return (
    <InvertibleThemeProvider
      dark={darkMode}
      options={mergedThemeOptions}
      lightOptions={partialAppLightThemeOptions}
      darkOptions={partialAppDarkThemeOptions}
    >
      <Story {...args} />
    </InvertibleThemeProvider>
  )
}
