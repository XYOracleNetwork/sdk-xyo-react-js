import type { EmptyObject } from '@xylabs/object'
import type { SetOptions, ValidControlValue } from '@xyo-network/react-form-group'
import { FormControlBase } from '@xyo-network/react-form-group'
import valid from 'card-validator'

import { unmask } from '../utils/index.ts'

const CONTROL_NAME = 'cardNumber2'

export class CreditCardNumberFormControl<TProps extends EmptyObject = EmptyObject> extends FormControlBase<TProps> {
  creditCardType: string = ''

  override invalidMessage = 'Card Number is invalid'

  override pattern = /^(\d+)?$/
  override patternStrict = /^\d+$/

  override props = {
    autoComplete: 'cc-number',
    autoCorrect: 'off',
    id: CONTROL_NAME,
    inputMode: 'numeric',
    name: CONTROL_NAME,
    placeholder: '1234 1234 1234 1234',
    spellCheck: false,
  } as TProps

  override required = true

  override unmask = unmask

  constructor() {
    super()
    super.setName(CONTROL_NAME)
    this.setSerializeSettings({ sensitive: true, serializable: true })
  }

  override blurError(value: string) {
    const unmasked = unmask(value)
    const numberValidation = valid.number(unmasked)
    if (!numberValidation.isValid) {
      this.setErrorAndValidity(this.invalidMessage, 'INVALID')
      return
    }
    this.setErrorAndValidity('', 'VALID')
  }

  override changeError(value: string) {
    const unmasked = unmask(value)
    const match = RegExp(this.patternStrict).exec(unmasked)
    if (match) {
      const numberValidation = valid.number(unmasked)
      if (!numberValidation.isPotentiallyValid) {
        this.setErrorAndValidity(this.invalidMessage, 'INVALID')
        return
      }
      this.setErrorAndValidity('', 'VALID')
    } else {
      this.setErrorAndValidity(this.invalidMessage, 'INVALID')
    }
  }

  earlyNumberCheck(number: string) {
    switch (number) {
      case '4': {
        this.setCreditCardType('visa')
        break
      }
      case '5': {
        this.setCreditCardType('mastercard')
        break
      }
      case '3': {
        this.setCreditCardType('amex')
        break
      }
      case '6': {
        this.setCreditCardType('discover')
        break
      }
      default: {
        this.setCreditCardType('')
      }
    }
  }

  override getCursorPosition() {
    if (this.value) {
      const previousValue = this.previousValue ?? ''
      const unmasked = unmask(this.value)
      const numberValidation = valid.number(unmasked)
      const card = numberValidation.card
      const lengthChange = this.value.length - (previousValue?.length ?? 0)
      const unmaskedChange = unmask(this.value).length - unmask(previousValue).length

      if (card) {
        const gaps = card.gaps
        const oldCursor = this.cursorPosition.previous ?? 0
        const oldSeparation = gaps.filter((gap, i) => gap + i < oldCursor).length
        const newSeparation = gaps.filter((gap, i) => gap + i < oldCursor + lengthChange).length
        const newCursor = oldCursor - oldSeparation + newSeparation + unmaskedChange
        return newCursor
      }
    }
  }

  override mask(value: ValidControlValue = '') {
    const unmasked = unmask(value)
    const numberValidation = valid.number(unmasked)
    const card = numberValidation.card

    if (card) {
      const max = card.lengths.includes(16) ? 16 : card.lengths[0]
      const gaps = [...card.gaps, max]
      const newVal = gaps
        .map((gap, i) => unmasked.slice(gaps[i - 1] || 0, gap))
        .filter(Boolean)
        .join(' ')

      return newVal
    }

    return value
  }

  onCreditCardTypeChange: (type: string) => void = () => {}

  setCreditCardType(type: string) {
    this.creditCardType = type
    this.onCreditCardTypeChange(type)
  }

  override setValue(value = '', options: SetOptions) {
    const umMasked = this.unmask(value)
    super.setValue(umMasked, options)
    this.earlyNumberCheck(umMasked.charAt(0))
  }
}
