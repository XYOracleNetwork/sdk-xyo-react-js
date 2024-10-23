import { forget } from '@xylabs/forget'
import type { BaseParams } from '@xylabs/object'
import { BaseEmitter } from '@xyo-network/module-event-emitter'

import type {
  ControlSerializeSettings, ControlValueAccessor, SetOptions,
} from './ControlValueAccessor.ts'
import type { ValidControlValue } from './ValidControlValue.ts'

export type ControlValueAccessorBaseConfig = {
  disableEvents?: boolean
}

export const DefaultSetOptions: SetOptions = { disableEmit: false }

export type ControlValueAccessorBaseEvents<TValue = ValidControlValue> = {
  errorChanged: { error: string }
  touchChanged: { touched: boolean }
  valueChanged: { value: TValue }
}

/**
 * The base class for control value accessors interface
 */
export class ControlValueAccessorBase<
  TValue = ValidControlValue,
  TEventData extends ControlValueAccessorBaseEvents<TValue> = ControlValueAccessorBaseEvents<TValue>,
>
  extends BaseEmitter<BaseParams, TEventData>
  implements ControlValueAccessor<TValue> {
  private _error: string = ''

  private _previousValue = undefined as TValue

  private _serializeSettings: ControlSerializeSettings = { sensitive: false, serializable: false }

  private _touched: boolean = false

  private _value = undefined as TValue

  constructor(private config: ControlValueAccessorBaseConfig) {
    super({})
  }

  /**
   * The error message for the control.
   */
  get error() {
    return this._error
  }

  /**
   * The "previous value" of the input element.
   */
  get previousValue() {
    return this._previousValue
  }

  /**
   * The serialize settings of the input element.
   */
  get serializeSettings() {
    return this._serializeSettings
  }

  /**
   * The "touched" state of the input element.
   */
  get touched() {
    return this._touched
  }

  /**
   * The current value of the input element.
   */
  get value() {
    return this._value
  }

  /**
   * The registered callback function called when a change or input event occurs on the input
   * element.
   */
  onChange = (_: TValue) => {}

  /**
   * Registers a function called when the control error changes.
   */
  onErrorChange: (error: string) => void = () => {}

  /**
   * The registered callback function called when a blur event occurs on the input element.
   */
  onTouched = (_isTouched: boolean) => {}

  /**
   * Registers a function called when the control value changes.
   * @param  {(_value:ValidControlValue)=>void} fn
   * @returns void
   */
  registerOnChange(fn: (_value: TValue) => void): void {
    this.onChange = fn
  }

  /**
   * Registers a function called when the control error changes.
   * @param  {(error:string)=>void} fn
   */
  registerOnErrorChange(fn: (error: string) => void) {
    this.onErrorChange = fn
  }

  /**
   * Registers a function called when the control is touched.
   * @param  {(isTouched:boolean)=>void} fn
   * @returns void
   */
  registerOnTouched(fn: (isTouched: boolean) => void): void {
    this.onTouched = fn
  }

  /**
   * Sets the "touched" state of the input element.
   * @param  {boolean} isTouched
   */
  setTouched(isTouched: boolean) {
    if (this.touched !== isTouched) {
      this._touched = isTouched
      this.onTouched(isTouched)

      if (this.config.disableEvents) return
      const emit = async () => await this.emit('touchChanged', { touched: isTouched })
      forget(emit())
    }
  }

  /**
   * Sets the "value" property on the input element.
   * @param  {ValidControlValue} value
   * @returns void
   */
  setValue(value: TValue, options = DefaultSetOptions): void {
    this._previousValue = this._value

    const normalizedValue = value == null ? ('' as TValue) : value

    if (this.value !== normalizedValue) {
      this._value = normalizedValue
      this.onChange(normalizedValue)

      if (this.config.disableEvents || options.disableEmit) return
      const emit = async () => await this.emit('valueChanged', { value: normalizedValue })
      forget(emit())
    }
  }

  /**
   * Set the error message for the control.
   * @param  {string} error
   */
  protected setError(error: string) {
    if (this.error !== error) {
      this._error = error
      this.onErrorChange(error)

      if (this.config.disableEvents) return
      const emit = async () => await this.emit('errorChanged', { error })
      forget(emit())
    }
  }

  /**
   * Sets the "previous value" of the input element.
   * @param  {ValidControlValue} value
   * @returns void
   */
  protected setPreviousValue(value: TValue): void {
    this._previousValue = value
  }

  /**
   * Sets the serialize settings  of the input element.
   * @param  {ControlSerializeSettings} settings
   */
  protected setSerializeSettings(settings: ControlSerializeSettings) {
    this._serializeSettings = settings
  }
}
