import { BoundWitness } from '@xyo-network/boundwitness-model'

export const sampleBlock: BoundWitness = {
  _signatures: ['d0969a4edd2cbb55f879bb68733a36509dab7516c52e3066fd2e248ee80f98e36bdd56a0711140cfbc55106d4c65fe7ed58df8c03c5d360b34d3c74ea3b6fe1f'],
  addresses: ['9c6df83b84297985d3ccc1f721ba1c2e3608c751', 'BF005E04EF223aa18c0fBFF6B41BbB0227c45A48'],
  payload_hashes: [
    '43df96261884ec99e0d7667120d036065c1f6a88dbb999f30d7c820dc9a37ee5',
    '31b3a835ebad2b6f2d6cc16ec855b41f237116f52b515aac9a8f555fec05fa3e',
    '97e693d0eb86eec1ca28f2bb0c77ddaae821fd0a9adc51c1521cdd754e2e207d',
    'be39d7b3b3383e65405236c0c314e4601eb5e98859266fef4e5caf22b16d5706',
    '21ab79e5fae74ccc22d611a42732f9257e7a29a4da744e51ec99feda948e1115',
    'bd5825ee3cefa969ded2dd1a35d9f28a9a0f312703e7f57bf8554ccda24f0b5f',
  ],
  payload_schemas: [
    'network.xyo.location',
    'network.xyo.id',
    'network.xyo.id',
    'network.xyo.payload',
    'network.xyo.location.range.answer',
    'network.xyo.location.range.query',
  ],
  previous_hashes: [null],
  schema: 'network.xyo.boundwitness',
}
export const sampleBlockWithBoundWitnessPayload: BoundWitness = {
  _signatures: ['d0969a4edd2cbb55f879bb68733a36509dab7516c52e3066fd2e248ee80f98e36bdd56a0711140cfbc55106d4c65fe7ed58df8c03c5d360b34d3c74ea3b6fe1f'],
  addresses: ['9c6df83b84297985d3ccc1f721ba1c2e3608c751', 'BF005E04EF223aa18c0fBFF6B41BbB0227c45A48'],
  payload_hashes: [
    '43df96261884ec99e0d7667120d036065c1f6a88dbb999f30d7c820dc9a37ee5',
    '31b3a835ebad2b6f2d6cc16ec855b41f237116f52b515aac9a8f555fec05fa3e',
    '97e693d0eb86eec1ca28f2bb0c77ddaae821fd0a9adc51c1521cdd754e2e207d',
    'be39d7b3b3383e65405236c0c314e4601eb5e98859266fef4e5caf22b16d5706',
    '21ab79e5fae74ccc22d611a42732f9257e7a29a4da744e51ec99feda948e1115',
    'bd5825ee3cefa969ded2dd1a35d9f28a9a0f312703e7f57bf8554ccda24f0b5f',
  ],
  payload_schemas: [
    'network.xyo.boundwitness',
    'network.xyo.id',
    'network.xyo.id',
    'network.xyo.payload',
    'network.xyo.location.range.answer',
    'network.xyo.location.range.query',
  ],
  previous_hashes: [null],
  schema: 'network.xyo.boundwitness',
}
export const sampleBlockWithPayloads = {
  _archive: 'temp',
  _client: 'js',
  _hash: 'b31230e7f3386a63acc64cb5f89e5353d5f9379b3bd3ae7385c47b2e600fcbb2',
  _payloads: [
    {
      _archive: 'temp',
      _client: 'js',
      _hash: 'ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349',
      _observeDuration: 48,
      _timestamp: 1651520931057,
      definition: {
        $id: "'network.xyo.payload'",
        $schema: 'http://json-schema.org/draft-07/schema#',
        properties: {
          schema: {
            type: "'string'",
          },
        },
        required: ["'schema'"],
        type: "'object'",
      },
      schema: 'network.xyo.payload',
    },
    {
      _archive: 'temp',
      _client: 'js',
      _hash: '930443bfebbdd0c9d14d8787def961ab41838fe9681f64acdad82c84e8803b59',
      _observeDuration: 47,
      _timestamp: 1651520931057,
      salt: '117243fd-ee33-45af-b82c-d2cfeb1f85c9',
      schema: 'network.xyo.id',
    },
  ],
  _signatures: ['0c742ec946ae28759e997dab4a7d3ca2fa1315e76b6a60c985bd6508b1f870f0ce914a927e15af6ed84f113be4b14ee1a432a896fc1294fc33fa1bb557f1ad6a'],
  _timestamp: 1651520931051,

  addresses: ['9e828f8ba1e8e212398b0fb8ef2a6167e91db24c'],
  payload_hashes: [
    'ebeb156c9aa0db6e5bf9fe3bfcab5e7f2765235587667adc34c1e8966f899349',
    '930443bfebbdd0c9d14d8787def961ab41838fe9681f64acdad82c84e8803b59',
  ],
  payload_schemas: ['network.xyo.payload', 'network.xyo.id'],
  previous_hashes: [null],
  schema: 'network.xyo.boundwitness',
} as BoundWitness
