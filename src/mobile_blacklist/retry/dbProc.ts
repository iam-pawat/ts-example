import * as oracledb from 'oracledb'
export class DbProc {
    private constructor() {
    }
    static async getTransToRetry() {
        // Checkout a connection from the default pool
        let connection = await oracledb.getConnection();
        let result = await connection.execute(
            `SELECT
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
            status = 'M' `
        );
        // Release the connection back to the connection pool
        await connection.close();
        return result;
    }
}