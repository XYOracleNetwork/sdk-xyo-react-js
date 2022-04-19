const { argv } = require('yargs')

const getFlags = () => {
  const { _, $0, ...flags } = argv
  return flags
}

const getFlagsString = () => {
  const flags = getFlags()
  const resp = Object
    .keys(flags)
    .map(k => { return { flag: k, value: flags[k] } })
    .map(curr => { return (curr.flag.length === 1 ? '-' : '--') + `${curr.flag} ${curr.value}` })
    .join(' ')
  return resp
}

module.exports = { getFlags, getFlagsString }