"use strict";
/// Retry Process
/// 1.Schduler
/// 2.Fetch Data from DB
/// 3.Iterate Row Item
/// 4.Push Data to Concurrent Q
/// 4.1 > Send Queue
/// 4.2 > IF Success => Flag N
///     > Else Fail => Flag M : Send Queue Fail from Retry Process
///     >   +1 Retry
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// #### Schedule
const schedule = require("node-schedule");
const logger_1 = require("../base/logger");
const queueProc_1 = require("./queueProc");
const dbProc_1 = require("./dbProc");
const db_1 = require("../base/db");
(function mainProc() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.DB.initDBPolling();
        //dotenv.config({ path: path.join(__dirname, '..', '..', '..', '/.env') })
        logger_1.default.info('Mob Backlist Retry Start');
        const rule = new schedule.RecurrenceRule();
        rule.second = new schedule.Range(0, 59, 5);
        const jobProcess = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let recordsForRetry = null;
                try {
                    recordsForRetry = yield dbProc_1.DbProc.getTransToRetry();
                    logger_1.default.info(`query record for input queue : ${recordsForRetry.rows.length} rows`);
                }
                catch (error) {
                    logger_1.default.error(error);
                    throw new Error('Query Record from DB for input Queue Error.');
                }
                recordsForRetry.rows.forEach(item => {
                    queueProc_1.default.push(item);
                });
            }
            catch (error) {
                logger_1.default.error(error, 'Input Queue Process');
            }
        });
        schedule.scheduleJob(rule, jobProcess);
        process.once('SIGTERM', db_1.DB.closePoolAndExit).once('SIGINT', db_1.DB.closePoolAndExit);
    });
})();
//# sourceMappingURL=index.js.map