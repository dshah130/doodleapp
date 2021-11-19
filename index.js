const express = require('express');

const newConnection = require('./DBConnection');

const app = express();


//serve static contents
app.use(express.static('static'));
app.use(express.urlencoded({
    extended:true
}))

// dynamic handling

app.get('/add-timeslot', (req,res) => {
    let conn = newConnection();
    conn.connect();

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


    conn.query(`insert into Timeslot values('${req.query.start_time1}','${req.query.end_time1}')`)    
    conn.query(`insert into Timeslot values('${req.query.start_time2}','${req.query.end_time2}')`)   
    conn.query(`insert into Timeslot values('${req.query.start_time3}','${req.query.end_time3}')`)    
    conn.query(`insert into Timeslot values('${req.query.start_time4}','${req.query.end_time4}')`)   
    conn.query(`insert into Timeslot values('${req.query.start_time5}','${req.query.end_time5}')`)    
    conn.query(`insert into Timeslot values('${req.query.start_time6}','${req.query.end_time6}')`)   
    conn.query(`insert into Timeslot values('${req.query.start_time7}','${req.query.end_time7}')`)   
    conn.query(`insert into Timeslot values('${req.query.start_time8}','${req.query.end_time8}')`)    
    conn.query(`insert into Timeslot values('${req.query.start_time9}','${req.query.end_time9}')`)   
    conn.query(`insert into Timeslot values('${req.query.start_time10}','${req.query.end_time10}')`
    , (err,rows,fields) => {
        res.redirect('/adminlogin');
    });   
    conn.end();
})
app.get('/time', (request, response) => {
    let conn=newConnection();
    conn.connect();
    let timeList;
    let content = '';
    conn.query(`select * from Timeslot`, (err,rows,fields) => {

        timeList = rows;

        content =`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <table>
                <tr>
                  <th></th>
                  <th>Timeslot 1</th>
                  <th>Timeslot 2</th>
                  <th>Timeslot 3</th>
                  <th>Timeslot 4</th>
                  <th>Timeslot 5</th>
                  <th>Timeslot 6</th>
                  <th>Timeslot 7</th>
                  <th>Timeslot 8</th>
                  <th>Timeslot 9</th>
                  <th>Timeslot 10</th>
                </tr>
                <tr> 
                <td></td>`
        for (p of timeList)
        {
            //content += '<div>';
            content += `<td>${p.start_time}</td>`
           // content += '</div>'
           // content += '\n';
        }
        content += `</tr>
        <tr> 
        <td></td>`
        for (p of timeList)
        {
            //content += '<div>';
            content += `<td>to</td>`
           // content += '</div>'
           // content += '\n';
        }
        content += `</tr>
        <tr>
        <td></td> `
        for (p of timeList)
        {
            //content += '<div>';
            content += `<td>${p.end_time}</td>`
           // content += '</div>'
           // content += '\n';
        }
        content += `</tr>       
        `
    //response.send(content);
    })

    conn.query('SELECT * FROM Reservations', (err, rows, fields)=>{
        let poll = rows;
        for(p of poll){
            let slots =[p.slot1, p.slot2, p.slot3,p.slot4,p.slot5,p.slot6,p.slot7,p.slot8,p.slot9,p.slot10]
            content += '<tr>'
                content += '<td>' + p.personName + '</td>';
                for(let i = 0; i<slots.length; i++){
                    if(slots[i] == 1){
                        content += '<td style="background-color:green"></td>'
                    }else if (slots[i] == 0){
                        content += '<td style="background-color:red"></td>'
                    }
                }
            content += '</tr>'
        }
        content +=  `
        
        </table>
        <table>
        <tr>
        <form action='/availability' method='post'>
            <input name='usr' type='text'/>`

        for(let i = 1; i<= 10; i++)
            content += `<input name='slot${i}' type='checkbox'>`

        content += `<input type='submit'>
        </form>
        </tr>
        </table>
    </body>
    </html>`

        response.send(content)
    })

    
    conn.end();
})

app.post('/availability', (req, res)=>{    
     let availability = [req.body.slot1,req.body.slot2,req.body.slot3,req.body.slot4,req.body.slot5,req.body.slot6,req.body.slot7,req.body.slot8,req.body.slot9,req.body.slot10];     
     let conn = newConnection();     
     console.log(availability[1])     
     conn.connect();    
    for(let a = 0; a < availability.length; a++){        
         if(availability[a] == 'on')            
            availability[a] = 1;         
          else             
            availability[a] = 0; 
        }    
        conn.query(`INSERT INTO Reservations VALUES('${req.body.usr}', ${availability[0]}, ${availability[1]}, ${availability[2]}, ${availability[3]}, ${availability[4]}, ${availability[5]}, ${availability[6]}, ${availability[7]}, ${availability[8]}, ${availability[9]})`);    
        conn.end();     
        res.redirect('/time') })

        app.post('/login', (req,res) =>{
            if (req.body.user == 'admin' && req.body.pass == 'pass'){
                res.redirect('/adminlogin')
            }
            else
                res.send(`Wrong Username or Password <br /> <button onclick= "location.href= 'admin.html'">Retry login </button>`)
        })


        app.get('/adminlogin', (req,res) => {
           // let username = req.body.user;
            //let password = req.body.pass;
            let conn = newConnection();
            conn.connect();
            let content = '';
            //---------------------
            let timeList;
            conn.query(`select * from Timeslot`, (err,rows,fields) => {
                   // content += `Wrong Username or Password <br /> <button onclick= "location.href= 'admin.html'">Retry login </button>`
          //  if (req.body.user == 'admin' && req.body.pass == 'pass'){
                content = `<!DOCTYPE html>
                <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <form action= '/add-timeslot' method = 'get'>`;
        for(let i = 1; i<=10; i++)
             {
                content += `Input Start Time Slot ${i}: <input name="start_time${i}" type="text"/> <br/>`
                content += `Input End Time Slot ${i}: <input name="end_time${i}" type="text"/> <br/>`
            }
        
            content += `<input type="submit"></form> <br></br>`
            
           // <button onclick="window.location.href='/time'">Check Current Time</button> 
            
            //content += `</body></html>`
           // }
                timeList = rows;
        
                content += `
                    <table>
                        <tr>
                          <th></th>
                          <th>Timeslot 1</th>
                          <th>Timeslot 2</th>
                          <th>Timeslot 3</th>
                          <th>Timeslot 4</th>
                          <th>Timeslot 5</th>
                          <th>Timeslot 6</th>
                          <th>Timeslot 7</th>
                          <th>Timeslot 8</th>
                          <th>Timeslot 9</th>
                          <th>Timeslot 10</th>
                        </tr>
                        <tr> 
                        <td></td>`
                for (p of timeList)
                {
                    //content += '<div>';
                    content += `<td>${p.start_time}</td>`
                   // content += '</div>'
                   // content += '\n';
                }
                content += `</tr>
                <tr> 
                <td></td>`
                for (p of timeList)
                {
                    //content += '<div>';
                    content += `<td>to</td>`
                   // content += '</div>'
                   // content += '\n';
                }
                content += `</tr>
                <tr>
                <td></td> `
                for (p of timeList)
                {
                    //content += '<div>';
                    content += `<td>${p.end_time}</td>`
                   // content += '</div>'
                   // content += '\n';
                }
                content += `</tr>  `     
                
            //response.send(content);
            })
        
            conn.query('SELECT * FROM Reservations', (err, rows, fields)=>{
                let poll = rows;
                for(p of poll){
                    let slots =[p.slot1, p.slot2, p.slot3,p.slot4,p.slot5,p.slot6,p.slot7,p.slot8,p.slot9,p.slot10]
                    content += '<tr>'
                        content += '<td>' + p.personName + '</td>';
                        for(let i = 0; i<slots.length; i++){
                            if(slots[i] == 1){
                                content += '<td style="background-color:green"></td>'
                            }else if (slots[i] == 0){
                                content += '<td style="background-color:red"></td>'
                            }
                        }
                    content += '</tr>'
                }
                content +=  `
                
                </table>
            </body>
            </html>`
            res.send(content)
            })
            //---------------------
            
            conn.end();
        })




app.listen(80);


