import * as oracledb from 'oracledb'
import log from '../base/logger'
export class DB {
    private constructor() {
    }
    static async initDBPolling() {
        try {
            await oracledb.createPool({
                user: process.env.DB_User,
                password: process.env.DB_Password,
                connectString: process.env.DB_ConnectionString
            })
            log.info(`init connection pooling for ${process.env.DB_User} : ${process.env.DB_ConnectionString}`)
        } catch (error) {
            log.error(error, `init connection pooling for ${process.env.DB_User} : ${process.env.DB_ConnectionString}`)
        }
    }
    static async closePoolAndExit() {
        try {
            await oracledb.getPool().close()
            console.log("Pool closed");
            process.exit(0);
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
    }
}
