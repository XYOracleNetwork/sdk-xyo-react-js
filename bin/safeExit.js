const safeExit = (func) => {
  try {
    func()
  } catch (ex) {
    process.exit(ex.code)
  }
}

module.exports = { safeExit }