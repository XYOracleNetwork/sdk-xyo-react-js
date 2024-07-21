import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Helper function to convert `__dirname` in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to read all files in a directory recursively
function getAllFiles(dir, fileList = []) {
  for (const file of fs.readdirSync(dir)) {
    const filePath = path.join(dir, file)
    if (fs.lstatSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList)
    } else if (path.extname(file) === '.tsx') {
      fileList.push(filePath)
    }
  }
  return fileList
}

// Function to process imports and exports in a file
function processImportsExports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const regex = /(import|export)\s+(.*?from\s+["'])(\.{1,2}\/.*?)(["'])/g

  content = content.replaceAll(regex, (match, p1, p2, p3, p4) => {
    const resolvedPath = path.resolve(path.dirname(filePath), p3)
    if (fs.existsSync(resolvedPath) && fs.lstatSync(resolvedPath).isDirectory()) {
      return `${p1} ${p2}${p3}/index.js${p4}`
    } else if (!/\.(json|js|ts|jsx|tsx)$/.test(p3)) {
      return `${p1} ${p2}${p3}.js${p4}`
    }
    return match
  })

  fs.writeFileSync(filePath, content, 'utf8')
}

// Main function to process all .ts files in the directory
function processFiles(directoryPath) {
  const files = getAllFiles(directoryPath)
  for (const filePath of files) {
    processImportsExports(filePath)
  }
}

// Change this to your source directory
const directoryPath = path.join(__dirname, 'packages')
processFiles(directoryPath)

console.log('Import paths corrected successfully.')
