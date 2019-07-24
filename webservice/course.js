module.exports = function (app) {
    app.get('/api/course/:id', function (req, res) {
        console.log("GET /api/course/" + req.params.id);

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM course WHERE id=" + req.params.id + ";").then(response => {
            res.send(response);
        });
    });

    app.get('/api/course', function (req, res) {
        console.log("GET /api/course");

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM course;").then(response => {
            res.send(response);
        });
    });

    app.post('/api/course', function (req, res) {
        console.log("POST /api/course");

        let conn = require('./../connection/factory');

        let update = false;
        if (req.body.id != undefined) {
            update = true;
        }

        if (update) {
            conn.executeQuery("UPDATE course SET title = '" + req.body.title + "', description = '" + req.body.description + "', days = " + req.body.days + ", manual = '" + req.body.manual + "', image = '" + req.body.image + " WHERE id = " + req.body.id + ";").then(response => {
                res.send(response);
            });
        } else {
            conn.executeQuery("INSERT INTO course (title, description, days, manual, image) VALUES ('" + req.body.title + "','" + req.body.description + "', " + req.body.days + ", '" + req.body.manual + "', '" + req.body.image + "');").then(response => {
                res.send(response);
            });
        }
    });
}