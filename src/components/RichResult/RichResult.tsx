import React from 'react'

import { Base, Thing } from './jsonld'

type WithContext<T extends Base> = T & {
  '@context': 'https://schema.org'
}

interface Props {
  thing: Thing
}

const RichResult: React.FC<Props> = (props) => {
  const { thing } = props
  const thingWithContext = thing as WithContext<Thing>
  thingWithContext['@context'] = 'https://schema.org'
  return <script type="application/ld+json">{JSON.stringify(thingWithContext)}</script>
}

export default RichResult
