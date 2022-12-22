const sh = require('shelljs')
const calledFromDir = sh.pwd().toString()
sh.cd(__dirname)
const debug = process.argv.pop() === '--debug'

const buildCmd = debug
  ? 'npm run build:debug'
  : 'npm run build'
const { code } = sh.exec(buildCmd)
if (code === 0 && calledFromDir !== __dirname) {
  const linkDir = `${calledFromDir}/out`
  const link = `${calledFromDir}/out/main.wasm`
  const packageName = require(`${__dirname}/package.json`).name
  const outFile = `./build/${debug ? 'debug' : 'release'}/${packageName}.wasm`
  sh.mkdir('-p', linkDir)
  sh.rm('-f', link)
  sh.cp('-u',outFile,link)
}

process.exit(code)
