module.exports = function (app) {
    app.get('/api/student/:id', function (req, res) {
        console.log("GET /api/student/" + req.params.id);

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM student WHERE id=" + req.params.id + ";").then(response => {
            res.send(response);
        });
    });
    
    app.get('/api/student', function (req, res) {
        console.log("GET /api/student");

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM student;").then(response => {
            res.send(response);
        });
    });

    app.post('/api/student', function (req, res) {
        console.log("POST /api/student");

        let conn = require('./../connection/factory');

        let update = false;
        if (req.body.id != undefined) {
            update = true;
        }

        if (update) {
            conn.executeQuery("UPDATE student SET name = '" + req.body.name + "', description = '" + req.body.description + "', username = '" + req.body.username + "', password = '" + req.body.password + "' WHERE id = " + req.body.id + ";").then(response => {
                res.send(response);
            });
        } else {
            let password = generatePassword();

            conn.executeQuery("INSERT INTO student (name, description, username, password) VALUES ('" + req.body.name + "','" + req.body.description + "', '" + req.body.username + "', '" + password + "');").then(response => {
                res.send(response);
            });
        }
    });

    function generatePassword() {
        let password = "";
        for(let i = 0; i < 10; i ++ ){
            password += getNumberPassword();
        }
        return password;   
    }

    function getNumberPassword() {
        return (Math.floor((Math.random() * 10) + 1));
    }
}