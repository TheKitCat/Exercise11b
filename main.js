/**
 * Exercise11 node part application
 * Reads all bmi records from server and sends it to the client
 */
var express = require('express'); //install via npm
var bodyParser = require("body-parser");//install via npm
var mysql = require("mysql");
var app = express();

/**
 * Allow cross origin headers
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

});

/**
 * Use body parser to parse post request
 */
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/**
 * Init Mysql connection
 * @type void
 */
var con = mysql.createConnection({
    host: "localhost",
    port: "8889", //necessary
    user: "middleware",
    password: "middleware",
    database: "records"
});

con.connect(function (err) {
        if (err)
            throw err;

        console.log("Connected!");
    });

app.post("/",function(req,res){
    
    con.query("SELECT * from bmi_record", function (err, rows, fields) {
        if (!err) {
            
            var result = [];
            rows.forEach(function(entry){
                //create json
                var entry = {
                    
                    id : entry.id,
                    date: entry.create_time,
                    patient: entry.patient,
                    bmi: entry.bmi,
                    height: entry.height,
                    weight : entry.weight
 
                };
                //append to result array
                result.push(entry);
                
            });
            //send results
            res.send(result);
            
            
        } else {
            
            console.log("Error while performing Query.");
        }

        
    });
    
    
});


//listens to port 8080
var server = app.listen(8080);







