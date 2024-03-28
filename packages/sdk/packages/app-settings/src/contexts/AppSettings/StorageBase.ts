import { assertEx } from '@xylabs/assert'
import { assertDefinedEx } from '@xyo-network/react-shared'

export class AppSettingsStorageBase {
  private defaults: Record<string, unknown>
  private prefix: string
  constructor(prefix = 'AppSettings', defaults?: Record<string, unknown>) {
    this.prefix = prefix
    this.defaults = defaults ?? {}
  }

  getBoolean(name: string): boolean {
    const storedValue = localStorage.getItem(`${this.prefix}|${name}`)
    if (!storedValue) {
      assertEx(typeof this.defaults[name] === 'boolean', () => 'Default value is not boolean')
      const defaultValue = this.defaults[name] as boolean
      assertEx(defaultValue !== undefined, () => `Missing Default for ${name}`)
      return defaultValue
    }
    return storedValue !== 'false'
  }

  getNumber(name: string): number {
    const storedValue = localStorage.getItem(`${this.prefix}|${name}`)
    if (!storedValue) {
      assertEx(typeof this.defaults[name] === 'number', () => 'Default value is not a number')
      const defaultValue = this.defaults[name] as number
      assertEx(defaultValue !== undefined, () => `Missing Default for ${name}`)
      return defaultValue
    }
    return Number.parseFloat(storedValue)
  }

  getObject<T>(name: string): T {
    const storedValue = localStorage.getItem(`${this.prefix}|${name}`)
    const parsedStoredValue = storedValue ? JSON.parse(storedValue) : null
    if (!parsedStoredValue) {
      assertEx(typeof this.defaults[name] === 'object', () => 'Default value is not object')
      return assertEx(this.defaults[name] as T, () => `Missing Default for ${name}`)
    }
    return parsedStoredValue as T
  }

  getString(name: string) {
    const storedValue = localStorage.getItem(`${this.prefix}|${name}`)
    if (!storedValue) {
      assertDefinedEx(typeof this.defaults[name] === 'string', 'Default value is not string')
      const defaultValue = this.defaults[name] as string
      assertEx(defaultValue !== undefined, () => `Missing Default for ${name}`)
      return defaultValue
    }
    return storedValue
  }

  getStringArray(name: string) {
    const storedValue = localStorage.getItem(`${this.prefix}|${name}`)?.split(',')
    if (!storedValue) {
      assertDefinedEx(Array.isArray(this.defaults[name]), 'Default value is not array')
      const defaultValue = this.defaults[name] as string[]
      assertEx(defaultValue !== undefined, () => `Missing Default for ${name}`)
      return defaultValue
    }
    return storedValue
  }

  setBoolean(name: string, value: boolean) {
    localStorage.setItem(`${this.prefix}|${name}`, JSON.stringify(value))
  }

  setNumber(name: string, value: number) {
    localStorage.setItem(`${this.prefix}|${name}`, JSON.stringify(value))
  }

  setObject<T>(name: string, value: T) {
    localStorage.setItem(`${this.prefix}|${name}`, JSON.stringify(value))
  }

  setString(name: string, value: string) {
    localStorage.setItem(`${this.prefix}|${name}`, value)
  }

  setStringArray(name: string, value: string[]) {
    localStorage.setItem(`${this.prefix}|${name}`, value.join(','))
  }
}
