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
class DbProc {
    constructor() {
    }
    static getTransToRetry() {
        return __awaiter(this, void 0, void 0, function* () {
            // Checkout a connection from the default pool
            let connection = yield oracledb.getConnection();
            let result = yield connection.execute(`SELECT
            objectid,
            documentno,
            documentdate,
            banno,
            invoiceno,
            paidamount,
            nas_trans_id,
            status,
            updatedate,
            system_name,
            errorcode,
            error_message,
            retry,
            process_id,
            createdate
        FROM
            temp_mob_post_nas
        WHERE 
            status = 'M' `);
            // Release the connection back to the connection pool
            yield connection.close();
            return result;
        });
    }
}
exports.DbProc = DbProc;
//# sourceMappingURL=dbProc.js.map