export const configDB = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'secure_password', //process.env.MYSQL_PASSWORD,
    database: 'sinapsis_technical_test', //process.env.MYSQL_DATABASE,
    connectionLimit: 10
}