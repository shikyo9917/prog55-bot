module.exports = {
    save: function (db, name, value) {
        db.query("SELECT loli FROM bank WHERE name = $1", [name], function (err, result) {
            if(err) throw err;

            if (result.rows.length == 0) {
                db.query("INSERT INTO bank(name, loli) VALUES($1, $2)", [name, value], function (err, result) {
                    if (err) throw err;
                    console.log(result);
                });
            }else{
                var loli = result.rows[0].loli;
                loli += value;
                db.query("UPDATE bank SET loli = $1 WHERE name = $2", [loli, name], function (err, result) {
                    if (err) throw err;
                    console.log(result);
                });
            }
        });
    }
}
