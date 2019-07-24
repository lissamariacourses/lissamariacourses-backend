const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("*"))

require('./webservice/student')(app);

var port = process.env.PORT || 3001
app.listen(port, function () {
    console.log("App running... http://localhost:" + port);
});