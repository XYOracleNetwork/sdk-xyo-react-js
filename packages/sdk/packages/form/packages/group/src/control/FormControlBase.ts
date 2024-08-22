import type { EmptyObject } from '@xylabs/object'

import { AbstractControl } from './AbstractControl.ts'
import type { SetOptions } from './accessor/index.ts'
import type { CursorPosition, FormControl } from './FormControl.ts'

const AllowAllRegex = /^.*$/s

/**
 * A base class for form controls and their validation.
 */
export abstract class FormControlBase<TProps extends EmptyObject = EmptyObject> extends AbstractControl implements FormControl {
  /**
   * The current and previous cursor position of the input element.
   */
  cursorPosition: CursorPosition = { current: undefined, previous: undefined }

  invalidMessage = 'Invalid input'
  pattern = AllowAllRegex
  patternStrict = AllowAllRegex
  props = {} as TProps
  required = false

  private _name: string | undefined = undefined

  constructor() {
    super()
  }

  get name() {
    return this._name
  }

  override get rawValue() {
    return this.unmask && this.value ? this.unmask(this.value) : this.value
  }

  blurError?(value: string): void | undefined
  changeError?(value: string): void
  getCursorPosition?(): number | undefined
  mask?(value: string): string
  onCursorChange: (cursor: number | undefined) => void = () => {}

  override setValue(value: string = '', setOptions: SetOptions) {
    // check for pattern validation
    if (this.unmask && this.pattern) {
      const unmasked = this.unmask(value)
      const match = unmasked.match(this.pattern)
      // set the new value before checking for errors
      super.setValue(this.mask ? this.mask(unmasked) : unmasked, setOptions)
      if (match) {
        // if the value matches the pattern, update the cursor position
        if (this.getCursorPosition) {
          const newCursor = this.getCursorPosition()
          this.onCursorChange(newCursor)
        }
      } else {
        // if no match, set the error and return to the previous value
        this.setValue(this.previousValue, setOptions)
        this.onCursorChange?.(this.cursorPosition.previous)
      }
    } else {
      // if no mask or pattern, just set the value
      super.setValue(value, setOptions)
    }
    // check for changeError validation after pattern validation
    this.changeError?.(value)
  }

  unmask?(value: string): string

  // For FormControls, validate is the same as running one of the error checking functions
  override validate(): boolean {
    const normalizedValue = this.value ?? ''
    // prefer the blurError function since validation assumes the user is done typing
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.blurError ? this.blurError(normalizedValue) : this.changeError?.(normalizedValue)
    return !this.error
  }

  protected setName(name: string | undefined) {
    this._name = name
  }
}
