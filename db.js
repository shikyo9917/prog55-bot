var pg = require('pg');

// console.log(process.env.DATABASE_URL);
// return;

//postgres://kngmnuuvlggsud:hnJ3dbx-xyGeyKHcTWZ5V8stNf@ec2-54-235-208-3.compute-1.amazonaws.com:5432/d50v8obblfa6f

var db = new pg.Client({
    user: "kngmnuuvlggsud",
    password: "hnJ3dbx-xyGeyKHcTWZ5V8stNf",
    host: "ec2-54-235-208-3.compute-1.amazonaws.com",
    port: 5432,
    database: "d50v8obblfa6f",
    ssl: true
});

db.connect(function (err) {
    if (err) {
        throw err
    }

    db.query("CREATE TABLE IF NOT EXISTS bank (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL, loli INT NOT NULL)", function (err, result) {
        if(err) throw err;

        console.log(result);
    })
});
