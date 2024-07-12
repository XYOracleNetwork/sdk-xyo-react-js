import type { Reflection } from 'typedoc'

import { ReflectionLookup } from './ReflectionLookup.js'
import { SomeReflection } from './SomeReflection.js'

type ReflectionWithChildren = { children: Reflection[] }

export const resolveChildren = <T extends SomeReflection>(reflection: ReflectionWithChildren, lookup: ReflectionLookup = {}): T[] => {
  return (reflection.children?.map((child) => {
    switch (typeof child) {
      case 'object': {
        return child
      }
      case 'number': {
        const childObj = lookup[child]
        if (childObj === undefined) {
          throw new Error(`Child Reference Not Found [${child}]`)
        }
        return childObj
      }
      default: {
        throw new Error(`Invalid Child Type [${typeof child}, ${child}]`)
      }
    }
  }) ?? []) as T[]
}
