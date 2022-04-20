const { execSync } = require('child_process')
const { safeExit } = require('./safeExit')

safeExit(() => {
  console.log(`Generate .env [${process.cwd()}]`)
  // Append the current environment to the .env (mostly for build server)
  execSync('printenv >> .env', { stdio: 'inherit' })
})