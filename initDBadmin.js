const mysql = require('mysql');

let conn = mysql.createConnection({
    host     : '34.68.217.182',
    user     : 'root',
    password : 'Basketball123!',
    database : 'lab3db'
});

conn.connect();
/*
conn.query(`Drop Table Timeslot`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )

conn.query(`CREATE TABLE Timeslot
            (
                start_time time,
                end_time time
                
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })
/*
conn.query(`insert into Timeslot values('12:30', '16:40')`
        , (err,rows,fields) => {
            if (err)
                console.log(err);
            else
                console.log('One row inserted');
        });

        conn.query( `select * from Timeslot `
        , (err,rows,fields) => {
            if (err)
                console.log(err);
            else
                console.log('One row inserted');
            for (r of rows)
                console.log(r);
        });
*/
conn.query(`Drop Table Reservations`,
                (err,rows,fields) => {
                    if (err)
                        console.log(err);
                    else
                        console.log('Table Dropped');
                }
            )
conn.query(`CREATE TABLE Reservations
            (
                personName VARCHAR(50),
                slot1 boolean,
                slot2 boolean,
                slot3 boolean,
                slot4 boolean,
                slot5 boolean,
                slot6 boolean,
                slot7 boolean,
                slot8 boolean,
                slot9 boolean,
                slot10 boolean
                
            )
            ` 
            , (err,rows,fields) => {
                if (err)
                    console.log(err);
                else
                    console.log('Table Created');
            })

conn.end();
