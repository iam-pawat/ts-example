import * as pino from 'pino'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: path.join('..', '..', '..', '.env') })
let pinoObj: pino.BaseLogger
const dest = path.join(__dirname, '..', '..', '..', 'logs')
const write_to_file: boolean = /^true$/i.test(process.env.LOG_TO_FILE)
const pretty: boolean = /^true$/i.test(process.env.LOG_PRETTY)
const level: string = process.env.LOG_LEVEL || 'debug'

let opts: pino.LoggerOptions = {
    level
}
if (pretty) {
    opts = Object.assign(opts, {
        prettyPrint: {
            translateTime: 'SYS:standard'
        }
    })
}
if (dest && !fs.existsSync(dest)) {
    fs.mkdirSync(dest);
}
pinoObj = pino(opts)
if (write_to_file) {
    pinoObj = pino(opts, pino.destination(path.join(dest, 'app.log')))
}
export default pinoObj
