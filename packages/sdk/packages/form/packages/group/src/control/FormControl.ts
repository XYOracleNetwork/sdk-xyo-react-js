import { EmptyObject } from '@xylabs/object'

import { AbstractControl } from './AbstractControl.tsx'

export type CursorPosition = {
  current: number | undefined
  previous: number | undefined
}

export interface FormControlValidator {
  blurError?: (value: string) => void
  changeError?: (value: string) => void
  // filter that supports an empty value
  pattern?: RegExp
  // filter that does not support an empty value
  patternStrict?: RegExp
  required?: boolean
}

export interface FormControlMask {
  cursorPosition: CursorPosition
  getCursorPosition?: () => number | undefined
  mask?: (value: string) => string
  onCursorChange?: (cursor: number | undefined) => void
  unmask?: (value: string) => string
}

export interface FormControl<TProps extends EmptyObject = EmptyObject> extends FormControlValidator, FormControlMask, AbstractControl {
  readonly name?: string
  props: TProps
}
