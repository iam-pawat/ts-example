"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config({ path: path.join('..', '..', '..', '.env') });
let pinoObj;
const dest = path.join(__dirname, '..', '..', '..', 'logs');
const write_to_file = /^true$/i.test(process.env.LOG_TO_FILE);
const pretty = /^true$/i.test(process.env.LOG_PRETTY);
const level = process.env.LOG_LEVEL || 'debug';
let opts = {
    level
};
if (pretty) {
    opts = Object.assign(opts, {
        prettyPrint: {
            translateTime: 'SYS:standard'
        }
    });
}
if (dest && !fs.existsSync(dest)) {
    fs.mkdirSync(dest);
}
pinoObj = pino(opts);
if (write_to_file) {
    pinoObj = pino(opts, pino.destination(path.join(dest, 'app.log')));
}
exports.default = pinoObj;
//# sourceMappingURL=logger.js.map