module.exports = function (app) {

    app.get('/api/student', function (req, res) {
        console.log("GET /api/student");

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM student;").then(response => {
            res.send(response);
        })
    })

}