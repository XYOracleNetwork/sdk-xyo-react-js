/* eslint-disable @delagen/deprecation/deprecation */
import React from 'react'

import { Base, Thing } from './jsonld'

/** @deprecated Moved to @xylabs/sdk-react */
type WithContext<T extends Base> = T & {
  '@context': 'https://schema.org'
}

/** @deprecated Moved to @xylabs/sdk-react */
interface Props {
  thing: Thing
}

/** @deprecated Moved to @xylabs/sdk-react */
const RichResult: React.FC<Props> = (props) => {
  const { thing } = props
  const thingWithContext = thing as WithContext<Thing>
  thingWithContext['@context'] = 'https://schema.org'
  return <script type="application/ld+json">{JSON.stringify(thingWithContext)}</script>
}

export default RichResult
