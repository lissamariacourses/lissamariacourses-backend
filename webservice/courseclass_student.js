module.exports = function (app) {
    app.get('/api/courseclass_student/:id', function (req, res) {
        console.log("GET /api/courseclass_student");

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT " + 
                            " courseclass_student.needs_model as needs_model, " + 
                            " courseclass_student.model_phone as model_phone, " + 
                            " courseclass_student.rating as rating, " + 
                            " courseclass_student.courseclass_id as courseclass_id, " + 
                            " courseclass_student.student_id as student_id, " + 

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

                            " student.name as name, " + 
                            " student.description as description, " + 
                            " student.username as username " + 
                            
                            " FROM courseclass_student " +

                            " INNER JOIN courseclass on courseclass.id  = courseclass_student.courseclass_id " +
                            " INNER JOIN student on student.id = courseclass_student.student_id " +
                            " INNER JOIN course on course.id = courseclass.course_id " +
                            
                            "WHERE courseclass_id = '" + req.params.id + "';").then(response => {
            res.send(response);
        });
    });

    app.get('/api/courseclass_student', function (req, res) {
        console.log("GET /api/courseclass_student");

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM courseclass_student;").then(response => {
            res.send(response);
        });
    });

    app.post('/api/courseclass_student', function (req, res) {
        console.log("POST /api/courseclass_student");

        let conn = require('./../connection/factory');

        let update = false;
        if (req.body.id != undefined) {
            update = true;
        }

        if (update) {
            conn.executeQuery("UPDATE courseclass_student SET courseclass_id = " + req.body.courseclass_id + ", student_id = " + req.body.student_id + ", needs_model = " + req.body.needs_model + ", model_name = '" + req.body.model_name + "', model_phone = '" + req.body.model_phone + ", rating = '" + req.body.rating + " WHERE id = " + req.body.id + ";").then(response => {
                res.send(response);
            });
        } else {
            conn.executeQuery("INSERT INTO courseclass_student (courseclass_id, student_id, needs_model, model_name, model_phone, rating) VALUES (" + req.body.courseclass_id + "," + req.body.student_id + ", '" + req.body.needs_model + "', '" + req.body.model_name + "', '" + req.body.model_phone + "', " + req.body.rating + ");").then(response => {
                res.send(response);
            });
        }
    });
}