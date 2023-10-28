//const Queue = require('bull');
const fs = require('fs')
const es = require('event-stream')
const path = require('path')
const moment = require('moment')
const mssql = require('mssql')
const csv = require('csv-parse')

const FILE_NAME = "2023-Gasto-Diario.csv"
const PATH_FILE = path.join(__dirname, 'repository/downloaded', FILE_NAME)

const DBConfig = require('./DBconfig')
const utils = require('./utils')


const query_valid_codes = 
`select codigo_cui from [dbo].[int_datosabiertos_mef_3000]
union all
select codigo_cui from [dbo].[int_datosabiertos_mef_cui]
union all
select codigo_cui from [dbo].[int_datosabiertos_mef_puente]`

const sql_head = 'INSERT INTO [dbo].[int_datosabiertos_mef_general_2023] (' + utils.table_fields.join(', ') + ') VALUES '

function mainFunction() {

    mssql.connect(DBConfig, (err) => {
        if(err) console.log(err)
        else console.log('Conexion exitosa.')

        var request = new mssql.Request();

        request.query(query_valid_codes, (err, valid_codes_data) => {
            console.log("Tiempo inicio proceso : "+utils.getDateTimeString())
            if(err) console.log(err)
            else console.log('Lectura de codigos validos...')

            let lines = {
                valid_codes: valid_codes_data.recordsets[0],
                times_saved: 0,
                actual_sql: [],
                history_sql: []
            }

            fs.createReadStream(PATH_FILE, 'utf-8')
                .pipe(csv.parse({ delimiter: ",", from_line: 2 }))
                .on('data', (data) => {                    
                    utils.buildQueryLineValues(data, lines)

                    if(lines.actual_sql.length === 100){
                        let insert_query = sql_head+lines.actual_sql.join(', ');
                        
                        lines.history_sql.push(lines.actual_sql)
                        lines.actual_sql = []
                        request.query(insert_query, (err) => {                                
                            if(err){
                                utils.writeLog(lines.times_saved, err, lines.history_sql[lines.history_sql.length - 1])
                                console.log(lines.times_saved + "° : Error save data - " + err)   
                            } else {
                            lines.times_saved++                                                  
                            console.log(lines.times_saved + "° : succesully save data" + utils.getDateTimeString())
                            }
                        })  
                    }
                }).on('end', () => {
                    if(lines.actual_sql.length !== 0){
                        let insert_query = sql_head+lines.actual_sql.join(', ');
                            
                        lines.history_sql.push(lines.actual_sql)
                        lines.actual_sql = []

                        request.query(insert_query, (err) => {                              
                            if(err){
                                console.log(lines.times_saved + "° : Error save data - " + err)   
                            } else {                            
                                lines.times_saved++
                                console.log(lines.times_saved + "° : succesully save data - " + utils.getDateTimeString())
                            }
                        })
                    }
                    console.log('Guardado de datos terminado')
                    console.log('block number : ' + lines.times_saved)
                    console.log("Tiempo fin proceso : " + utils.getDateTimeString())
            
                }).on('error', (err) => {
                    console.log(err)
                })
        })
    })
}

mainFunction()
