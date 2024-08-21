import { forget } from '@xylabs/forget'

import type {
  ControlValueAccessorBaseEvents,
  FormControlStatus,
  ValidControlValue,
} from './accessor/index.ts'
import {
  ControlValueAccessorBase,
  DISABLED,
  INVALID,
  PENDING,
  VALID,
} from './accessor/index.ts'

export type AbstractControlEvents<TValue> = ControlValueAccessorBaseEvents<TValue> & {
  statusChanged: { status: FormControlStatus }
}

/**
 * This is the base class for `Control` classes (i.e. FormControl),
 *
 * It provides some of the shared behavior that all controls and groups of controls have, like
 * running validators, calculating status, and resetting state. It also defines the properties
 * that are shared between all sub-classes, like `value`, `valid`, and `dirty`. It shouldn't be
 * instantiated directly.
 *
 * NOTE: Heavily borrowed from Angular's AbstractControl:
 * https://github.com/angular/angular/blob/5dcdbfcba934a930468aec140a7183b034466bdf/packages/forms/src/model/abstract_model.ts
 */
export class AbstractControl<TValue extends ValidControlValue = ValidControlValue> extends ControlValueAccessorBase<
  TValue,
  AbstractControlEvents<TValue>
> {
  private _status: FormControlStatus | undefined = undefined

  constructor() {
    super({})
  }

  /**
   * A control is `disabled` when its `status` is `DISABLED`.
   *
   * Disabled controls are exempt from validation checks and
   * are not included in the aggregate value of their ancestor
   * controls.
   *
   * @returns True if the control is disabled, false otherwise.
   */
  /** @deprecated - disabled functionality not implemented */
  get disabled(): boolean {
    return this.status === DISABLED
  }

  /**
   * A control is `enabled` as long as its `status` is not `DISABLED`.
   *
   * @returns True if the control has any status other than 'DISABLED',
   * false if the status is 'DISABLED'.
   */
  get enabled(): boolean {
    return this.status !== DISABLED
  }

  /**
   * A control is `invalid` when its `status` is `INVALID`.

   *
   * @returns True if this control has failed one or more of its validation checks,
   * false otherwise.
   */
  get invalid(): boolean {
    return this.status === INVALID
  }

  /**
   * A control is `pending` when its `status` is `PENDING`.
   *
   * @returns True if this control is in the process of conducting a validation check,
   * false otherwise.
   */
  get pending(): boolean {
    return this.status == PENDING
  }

  /**
   * The raw value of the control.
   */
  get rawValue(): TValue {
    return this.value
  }

  /**
   * The current status of the control.
   */
  get status() {
    return this._status
  }

  /**
   * A control is `valid` when its `status` is `VALID`.
   *
   * @returns True if the control has passed all of its validation tests,
   * false otherwise.
   */
  get valid(): boolean {
    return this.status === VALID
  }

  setErrorAndValidity(error: string, status: FormControlStatus) {
    this.setError(error)
    this.setStatus(status)
  }

  setStatus(status: FormControlStatus) {
    if (this._status === status) return

    this._status = status

    const emit = async () => await this.emit('statusChanged', { status })
    forget(emit())
  }

  validate(): boolean {
    return true
  }
}
