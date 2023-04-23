// import mysql from 'mysql2';
import mysql from 'mysql2/promise'

// create the connection to database
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejs_basic'
// });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs_basic'
});

// // simple query
// connection.query(
//     'SELECT * FROM `users` ',
//     function (err, results, fields) {
//         console.log('>>> check mysql')
//         console.log(results); // results contains rows returned by server
//         let rows = results.map((row) => { return row });
//         console.log(rows); // results contains rows returned by server

//     }
// );

// export default connection;
export default pool;