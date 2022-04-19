const { execSync } = require('child_process')

const safeExit = (func) => {
  try {
    func()
  } catch (ex) {
    process.exit(ex.code)
  }
}

safeExit(() => {
  console.log(`Docker build [${process.cwd()}]`)
  // This is the path to the Dockerfile for any project which depends on this
  // library relative to the root of the dependent
  execSync('docker build -f ./node_modules/@xyo-network/sdk-xyo-react/Dockerfile .', { stdio: 'inherit' })
})