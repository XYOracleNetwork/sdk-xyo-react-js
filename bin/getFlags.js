const yargs = require('yargs')

const getFlags = () => {
  const { _, $0, ...flags } = yargs.parserConfiguration({
    "camel-case-expansion": false,
  }).argv
  return flags
}

const getFlagFromProperty = (name, value) => {
  const dash = name.length === 1 ? '-' : '--'
  return Array.isArray(value) ?
    value.map(v => { return getFlagFromProperty(name, v) }).join(' ') :
    `${dash}${name} ${value}`
}

const getFlagsString = () => {
  const flags = getFlags()
  const resp = Object
    .keys(flags)
    .map(k => { return { flag: k, value: flags[k] } })
    .map(curr => { return getFlagFromProperty(curr.flag, curr.value) })
    .join(' ')
  return resp
}

module.exports = { getFlags, getFlagsString }