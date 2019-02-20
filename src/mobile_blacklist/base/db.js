"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb = require("oracledb");
const logger_1 = require("../base/logger");
class DB {
    constructor() {
    }
    static initDBPolling() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield oracledb.createPool({
                    user: process.env.DB_User,
                    password: process.env.DB_Password,
                    connectString: process.env.DB_ConnectionString
                });
                logger_1.default.info(`init connection pooling for ${process.env.DB_User} : ${process.env.DB_ConnectionString}`);
            }
            catch (error) {
                logger_1.default.error(error, `init connection pooling for ${process.env.DB_User} : ${process.env.DB_ConnectionString}`);
            }
        });
    }
    static closePoolAndExit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield oracledb.getPool().close();
                console.log("Pool closed");
                process.exit(0);
            }
            catch (err) {
                console.error(err.message);
                process.exit(1);
            }
        });
    }
}
exports.DB = DB;
//# sourceMappingURL=db.js.map