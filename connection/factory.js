const mysql = require('mysql');
const Promise = require('bluebird');
let connection = undefined;

function getConnection() {
    connection = mysql.createConnection({
        host: 'lissamariacourses.cfvpj09lhgo0.us-east-1.rds.amazonaws.com',
        user: 'paulomunoz',
        password: 'nq2cJVQTbz2LGrXm',
        database: 'lissamariacourses'
    });
}

function executeQuery(query) {
    return new Promise(function (resolve, reject) {
        getConnection();

        connection.connect();

        connection.query(query, function (error, results, fields) {
            if (error) throw error;

            connection.end();

            resolve(results);
        });

    });
}

module.exports = {
    executeQuery
}

