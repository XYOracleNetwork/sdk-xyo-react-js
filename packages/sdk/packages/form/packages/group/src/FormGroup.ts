import { forget } from '@xylabs/forget'
import type { EventListener } from '@xyo-network/module-events'
import type { Payload } from '@xyo-network/payload-model'

import type { ControlValueAccessorBaseEvents } from './control/index.ts'
import { AbstractControl } from './control/index.ts'
import type { ErrorSummary } from './InputError.ts'
import type { FormGroupStorage } from './storage/index.ts'

export type PayloadWithTimestamp = Payload<{ timestamp?: number }>

export type KeyOfString<T> = keyof T extends string ? keyof T : never

type FormGroupErrors<TValue> = Record<KeyOfString<TValue>, string>

export type FormGroupParams<TStorageValue extends Payload = Payload> = {
  serialize?: boolean
  storage?: {
    sensitive?: FormGroupStorage<TStorageValue>
    storage?: FormGroupStorage<TStorageValue>
  }
  ttlStorage?: number
}

type ValueChangeEventListener = EventListener<ControlValueAccessorBaseEvents['valueChanged']>

/**
 * Organize form controls in a group.
 *
 * NOTE: This is a work in progress and only supports top level controls.  Nested controls are not supported.
 */
export class FormGroup<
  TValue extends PayloadWithTimestamp = PayloadWithTimestamp,
  TStorageValue extends PayloadWithTimestamp = PayloadWithTimestamp,
> extends AbstractControl {
  private _controls = {} as Record<KeyOfString<TValue>, AbstractControl>

  private serializeListeners: Record<string, ValueChangeEventListener> = {}

  private serializedSensitiveState = {} as Record<KeyOfString<TStorageValue>, string>
  private serializedState = {} as Record<KeyOfString<TStorageValue>, string>

  constructor(private fgParams?: FormGroupParams<TStorageValue>) {
    super()
  }

  get errorSummary() {
    const errorSummary: ErrorSummary = {
      errorMessage: '',
      invalidFields: [],
    }
    for (const [key, value] of Object.entries(this.errors)) {
      if (value) {
        errorSummary.errorMessage = `${errorSummary.errorMessage}, ${value}`
        errorSummary.invalidFields.push(key)
      }
    }

    return errorSummary
  }

  get errors(): FormGroupErrors<TValue> {
    const value = {} as FormGroupErrors<TValue>
    for (const key in this._controls) {
      const castKey = key as KeyOfString<TValue>
      value[castKey] = this._controls[castKey].error
    }
    return value
  }

  get nonSensitiveStorage() {
    return this.fgParams?.storage?.storage
  }

  get sensitiveStorage() {
    return this.fgParams?.storage?.sensitive
  }

  override get touched() {
    return Object.values<AbstractControl>(this._controls).some(control => control.touched)
  }

  override get valid() {
    return Object.values<AbstractControl>(this._controls).every(control => control.valid)
  }

  get values(): TValue {
    const value = {} as TValue
    for (const key in this._controls) {
      const castKey = key as KeyOfString<TValue>
      value[castKey] = this._controls[castKey].rawValue as TValue[KeyOfString<TValue>]
    }
    return value
  }

  getControl(name: string) {
    return this._controls[name as KeyOfString<TValue>]
  }

  async getSerializedValue(name: string, sensitive = false): Promise<string | undefined> {
    const storage = sensitive ? this.sensitiveStorage : this.nonSensitiveStorage
    if (storage) {
      if (!storage) {
        console.warn(`Cannot return value for ${name}. No storage set`)
        return
      }

      const savedState = await storage.get()
      if (savedState && name in savedState) {
        const savedValue = savedState[name as keyof typeof savedState] as string

        // casting to PayloadWithTimestamp to check for timestamp
        const savedStateWithTimestamp = savedState as unknown as PayloadWithTimestamp
        if (savedStateWithTimestamp.timestamp && this.fgParams?.ttlStorage) {
          const expirationDate = savedStateWithTimestamp.timestamp + (this.fgParams?.ttlStorage ?? 0)
          const now = Date.now()
          return now > expirationDate ? undefined : savedValue
        }
        return savedValue
      }
    }
  }

  registerControl(name: string, control: AbstractControl) {
    if (this._controls[name as KeyOfString<TValue>]) console.error(`Replacing Control with name ${name} since it already exists!`)
    this._controls[name as KeyOfString<TValue>] = control
    this.serializeControlValue(name, control)
  }

  resetControls() {
    for (const key in this._controls) {
      this.unregisterControl(key)
    }
  }

  resetValues() {
    for (const control of Object.values<AbstractControl>(this._controls)) {
      control.setValue('')
    }
  }

  unregisterControl(name: string) {
    const control = this._controls[name as KeyOfString<TValue>]

    if (control) {
      const listener = this.serializeListeners[name]
      control.off('valueChanged', listener)
      delete this.serializeListeners[name]
      delete this._controls[name as KeyOfString<TValue>]
    }
  }

  validateFields(requiredFields?: string[] | undefined) {
    const castRequiredFields = requiredFields as KeyOfString<TValue>[]
    for (const key in this._controls) {
      const castKey = key as KeyOfString<TValue>
      if (castRequiredFields === undefined || castRequiredFields.includes(castKey)) {
        const control = this._controls[castKey]
        control.validate()
      }
    }
  }

  private serializeControlValue(name: string, control: AbstractControl) {
    const shouldSerialize = this.fgParams?.serialize
    const sensitiveStorage = this.sensitiveStorage
    const storage = this.nonSensitiveStorage

    if (!shouldSerialize && (storage || sensitiveStorage)) console.warn('storage medium set but serialize is not enabled')

    if (shouldSerialize && control.serializeSettings.serializable) {
      this.setStateValueFromStorage(name, control)

      const listener: ValueChangeEventListener = ({ value }) => {
        // detect if control wants to be serialized
        if (control.serializeSettings.serializable) {
          // detect control's preferred storage
          const targetStorage = control.serializeSettings.sensitive ? sensitiveStorage : storage

          // detect control's preferred state
          const targetState = control.serializeSettings.sensitive ? this.serializedSensitiveState : this.serializedState

          // set the value
          targetState[name as KeyOfString<TStorageValue>] = value ?? ''

          // add a timestamp
          const payloadWithTimestamp = targetState as PayloadWithTimestamp
          payloadWithTimestamp.timestamp = Date.now()

          // serialize the value
          this.serializeValues(targetStorage, targetState as TStorageValue)
        }
      }

      // listen for value changes
      control.on('valueChanged', listener)

      // store the listener for later removal
      this.serializeListeners[name] = listener
    }
  }

  private serializeValues(storage?: FormGroupStorage<TStorageValue>, values?: TStorageValue) {
    if (storage && values) {
      const write = async () => await storage.insert(values)
      const clear = async () => await storage.clear()

      forget(clear())
      forget(write())
    }
  }

  private setStateValueFromStorage(name: string, control: AbstractControl) {
    const read = async () => {
      const savedValue = await this.getSerializedValue(name, control.serializeSettings.sensitive)

      if (savedValue) {
        const targetState = control.serializeSettings.sensitive ? this.serializedSensitiveState : this.serializedState
        targetState[name as KeyOfString<TStorageValue>] = savedValue

        control.setValue(savedValue, { disableEmit: true })
      }
    }

    forget(read())
  }
}
