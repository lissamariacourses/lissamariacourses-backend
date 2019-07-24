module.exports = function (app) {
    app.get('/api/courseclass/:id', function (req, res) {
        console.log("GET /api/courseclass/" + req.params.id);

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM courseclass WHERE id=" + req.params.id + ";").then(response => {
            res.send(response);
        });
    });

    app.get('/api/courseclass', function (req, res) {
        console.log("GET /api/courseclass");

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM courseclass;").then(response => {
            res.send(response);
        });
    });

    app.get('/api/courseclass/class/:id', function (req, res) {
        console.log("GET /api/courseclass");

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT " + 
                            " course.title as title_course, " + 
                            " course.description as description_course, " + 
                            " course.days as days_course, " + 
                            " course.manual as manual_course, " + 
                            " course.image as image_course, " + 
                            " courseclass.title as title_courseclass, " + 
                            " courseclass.description as description_courseclass, " + 
                            " courseclass.status as status_courseclass, " + 
                            " courseclass.start_date as start_date_courseclass, " + 
                            " courseclass.end_date as end_date_courseclass, " + 
                            " courseclass.course_id as course_id" + 
                            " FROM courseclass INNER JOIN course on course.id = courseclass.course_id  WHERE courseclass.course_id = " + req.params.id + ";").then(response => {
            res.send(response);
        });
    });

    app.post('/api/courseclass', function (req, res) {
        console.log("POST /api/courseclass");

        let conn = require('./../connection/factory');

        let update = false;
        if (req.body.id != undefined) {
            update = true;
        }

        if (update) {
            conn.executeQuery("UPDATE courseclass SET title = '" + req.body.title + "', description = '" + req.body.description + "', status = '" + req.body.status + "', start_date = '" + req.body.start_date + "', end_date = '" + req.body.end_date + ", course_id = '" + req.body.course_id + " WHERE id = " + req.body.id + ";").then(response => {
                res.send(response);
            });
        } else {
            conn.executeQuery("INSERT INTO courseclass (title, description, status, start_date, end_date, course_id) VALUES ('" + req.body.title + "','" + req.body.description + "', '" + req.body.status + "', '" + req.body.start_date + "', '" + req.body.end_date + "', " + req.body.course_id + ");").then(response => {
                res.send(response);
            });
        }
    });
}