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

const sql_head = 'INSERT INTO ' + utils.table_fields.join(', ') 

function mainFunction() {

    mssql.connect(DBConfig, (err) => {
        if(err) console.log(err)
        else console.log('Conexion exitosa.')

        var request = new mssql.Request();

        request.query(query_valid_codes, (err, valid_codes_data) => {
            console.log("Tiempo inicio proceso : "+utils.getDateTimeString())
            if(err) console.log(err)
            else console.log('Lectura de codigos validos exitos...')

            let sql_body = '';
            var amount_valid_lines = 0;
            var save_times = 0;
            var index = 0;

            fs.createReadStream(PATH_FILE, 'utf-8')
                .pipe(csv.parse({ delimiter: ",", from_line: 2 }))
                .on('data', (line_data) => {
                    // index++
                    // if(index == 1){
                    //     if(row.toString() == utils.file_fields.toString()){
                    //         console.log('Cabecera de fichero csv no coincide')
                    //         reject(new Error('uh'));
                    //     }
                    // }

                    // if(row.toString() !== utils.file_fields.toString()){
                    //     console.log('Cabecera de fichero csv no coincide')
                    // }else{
                        sql_body = sql_body + utils.buildQueryLineValues(line_data, valid_codes_data.recordsets[0], amount_valid_lines)
                        
                        if(amount_valid_lines == 10){
                            request.query(sql_head+sql_body.slice(0,-1), (err) => {
                                save_times++
                                if(err){
                                    //console.log(err)
                                    console.log(save_times + "° : Error save data")   
                                }                         
                                console.log(save_times + "° : succesully save data")
                            })    
                        }
                    // }
                }).on('end', () => {
                    if(sql_body){
                        request.query(sql_head+sql_body.slice(0,-1), (err) => {
                            save_times++
                            if(err){
                                //console.log(err)
                                console.log(save_times + "° : Error save data")   
                            }                         
                            console.log(save_times + "° : succesully save data")
                        })
                    }
                    console.log('Guardado de datos terminado')
                    console.log('block number : ' + save_times)
                    console.log("Tiempo fin proceso : "+utils.getDateTimeString())
            
                }).on('error', (err) => {
                    console.log(err)
                })

            //console.log(data.recordset);
        })
    })

    // var cont = 0
    // var cont2 = 0
    // var cont3 = 1

    // fs.createReadStream(PATH_FILE, 'utf-8')
    //     .pipe(es.split())
    //     .on('data', (row, index) => {
            
    //         let data_line = getLineData(row)

    //         file_fields = (row.split(','));

    //         cont = cont + 1
    //         if(cont3 == 1) {
    //             console.log(data_line.ANO_EJE)
    //             cont3 = 0
    //         }
    //         if(cont == 5000) {
    //             // console.log(row)
    //             cont = 0
    //             cont2 = cont2 + 1
    //         }

                     
    //     }).on('end', () => {
    //         console.log('finished')
    //         console.log('block number : ' + cont2)
    //     })
}

function getLineData(line){
    return 
}

mainFunction()


// ANO_EJE,
// MES_EJE,
// TIPO_GOBIERNO,
// TIPO_GOBIERNO_NOMBRE,
// SECTOR,
// SECTOR_NOMBRE,
// PLIEGO,
// PLIEGO_NOMBRE,
// SEC_EJEC,
// EJECUTORA,
// EJECUTORA_NOMBRE,
// DEPARTAMENTO_EJECUTORA,
// DEPARTAMENTO_EJECUTORA_NOMBRE
// PROVINCIA_EJECUTORA,
// PROVINCIA_EJECUTORA_NOMBRE,
// DISTRITO_EJECUTORA,
// DISTRITO_EJECUTORA_NOMBRE,
// SEC_FUNC,
// PROGRAMA_PPTO,
// PROGRAMA_PPTO_NOMBRE,
// TIPO_ACT_PROY,
// PRODUCTO_PROYECTO,
// PRODUCTO_PROYECTO_NOMBRE,
// ACTIVIDAD_ACCION_OBRA,
// ACTIVIDAD_ACCION_OBRA_NOMBRE, 
// FUNCION,
// FUNCION_NOMBRE,
// DIVISION_FUNCIONAL,
// DIVISION_FUNCIONAL_NOMBRE,
// GRUPO_FUNCIONAL,
// GRUPO_FUNCIONAL_NOMBRE,
// META,
// FINALIDAD,
// META_NOMBRE,
// DEPARTAMENTO_META,
// DEPARTAMENTO_META_NOMBRE,
// FUENTE_FINANC,
// FUENTE_FINANC_NOMBRE,
// RUBRO,
// RUBRO_NOMBRE,
// TIPO_RECURSO,
// TIPO_RECURSO_NOMBRE,
// CATEG_GASTO,
// CATEG_GASTO_NOMBRE,
// TIPO_TRANSACCION,
// GENERICA,
// GENERICA_NOMBRE,
// SUBGENERICA,
// SUBGENERICA_NOMBRE,
// SUBGENERICA_DET,
// SUBGENERICA_DET_NOMBRE,
// ESPECIFICA,
// ESPECIFICA_NOMBRE,
// ESPECIFICA_DET,
// ESPECIFICA_DET_NOMBRE,
// MONTO_PIA,
// MONTO_PIM,
// MONTO_CERTIFICADO,
// MONTO_COMPROMETIDO_ANUAL,
// MONTO_COMPROMETIDO,
// MONTO_DEVENGADO,
// MONTO_GIRADO,
// TIPO_ACT_PROY_NOMBRE
