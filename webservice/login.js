module.exports = function (app) {
    app.post('/api/login/', function (req, res) {
        console.log("GET /api/login/" + req.body.username);

        let conn = require('./../connection/factory');
        conn.executeQuery("SELECT * FROM student WHERE username='" + req.body.username + "';").then(response => {

            if(response != undefined) {
                if(response[0] != undefined) {
                    for(let item of response) {
                        if(item.password == req.body.password) {
                            res.send(true);
                        } else {
                            res.send(false);
                        }
                        break;
                    }
                }
            }
        });
    });
}