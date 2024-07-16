import { ValidControlValue } from './ValidControlValue.js'

export interface SetOptions {
  disableEmit?: boolean
}

export interface ControlSerializeSettings {
  sensitive?: boolean
  serializable?: boolean
}

export interface ControlValueAccessor<T = ValidControlValue> {
  readonly error: string
  readonly previousValue: T
  readonly serializeSettings: ControlSerializeSettings
  readonly touched: boolean
  readonly value: T
  registerOnChange(fn: (value: T) => void): void
  registerOnErrorChange(fn: (error: string) => void): void
  registerOnTouched(fn: (isTouched: boolean) => void): void
  setTouched(isTouched: boolean): void
  setValue(fieldValue: T, options?: SetOptions): void
}
