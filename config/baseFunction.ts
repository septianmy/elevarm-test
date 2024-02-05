import connection from "./db"

export const query = (sql: any, args: any) => {
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, args, (err: any, rows: any) => {
            if (err) {
                return reject({
                    sql,
                    args,
                    err
                });
            } else {
                return resolve(rows.rows);
            }
        });
    });
};