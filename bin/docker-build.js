const { execSync } = require('child_process')

const safeExit = (func) => {
  try {
    func()
  } catch (ex) {
    process.exit(error.code)
  }
}

safeExit(() => {
  console.log(`Docker build [${process.cwd()}]`)
  execSync('docker build -f ./node_modules/@xyo-network/sdk-xyo-react/Dockerfile .', { stdio: 'inherit' })
})