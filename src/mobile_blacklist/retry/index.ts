/// Retry Process
/// 1.Schduler
/// 2.Fetch Data from DB
/// 3.Iterate Row Item
/// 4.Push Data to Concurrent Q
/// 4.1 > Send Queue
/// 4.2 > IF Success => Flag N
///     > Else Fail => Flag M : Send Queue Fail from Retry Process
///     >   +1 Retry

// #### Schedule
import * as schedule from 'node-schedule'
import * as dotenv from 'dotenv'
import * as path from 'path'

import log from '../base/logger'
import q from './queueProc'
import { DbProc } from './dbProc'
import { DB } from '../base/db'
import { IExecuteReturn } from 'oracledb';

(async function mainProc() {
    await DB.initDBPolling()
    //dotenv.config({ path: path.join(__dirname, '..', '..', '..', '/.env') })
    log.info('Mob Backlist Retry Start')
    const rule = new schedule.RecurrenceRule()
    rule.second = new schedule.Range(0, 59, 5);

    const jobProcess = async () => {
        try {
            let recordsForRetry: IExecuteReturn = null
            try {
                recordsForRetry = await DbProc.getTransToRetry()
                log.info(`query record for input queue : ${recordsForRetry.rows.length} rows`)
            } catch (error) {
                log.error(error)
                throw new Error('Query Record from DB for input Queue Error.')
            }
            recordsForRetry.rows.forEach(item => {
                q.push(item)
            })
        } catch (error) {
            log.error(error, 'Input Queue Process')

        }
    }
    schedule.scheduleJob(rule, jobProcess)
    process.once('SIGTERM', DB.closePoolAndExit).once('SIGINT', DB.closePoolAndExit)
})()








