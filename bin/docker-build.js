const { execSync } = require('child_process')
const { safeExit } = require('./safeExit')
const { getFlagsString } = require('./getFlags')

safeExit(() => {
  console.log(`Docker build [${process.cwd()}]`)
  // This is the path to the Dockerfile for any project which depends on this
  // library relative to the root of the dependent
  const command = [
    'docker',
    'build',
    '-f',
    './node_modules/@xyo-network/sdk-xyo-react/Dockerfile',
    getFlagsString(),
    '.',
  ].join(' ')
  console.log(command)
  execSync(command, { stdio: 'inherit' })
})