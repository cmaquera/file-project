const fs = require('fs');

module.exports = {
    table_fields : [    
        'ANO_EJE',
        'MES_EJE',
        'TIPO_GOBIERNO',
        'TIPO_GOBIERNO_NOMBRE',
        'SECTOR',
        'SECTOR_NOMBRE',
        'PLIEGO',
        'PLIEGO_NOMBRE',
        'SEC_EJEC',
        'EJECUTORA',
        'EJECUTORA_NOMBRE',
        'DEPARTAMENTO_EJECUTORA',
        'DEPARTAMENTO_EJECUTORA_NOMBRE',
        'PROVINCIA_EJECUTORA',
        'PROVINCIA_EJECUTORA_NOMBRE',
        'DISTRITO_EJECUTORA',
        'DISTRITO_EJECUTORA_NOMBRE',
        'SEC_FUNC',
        'PROGRAMA_PPTO',
        'PROGRAMA_PPTO_NOMBRE',
        'TIPO_ACT_PROY',
        'TIPO_ACT_PROY_NOMBRE',
        'PRODUCTO_PROYECTO',
        'PRODUCTO_PROYECTO_NOMBRE',
        'ACTIVIDAD_ACCION_OBRA',
        'ACTIVIDAD_ACCION_OBRA_NOMBRE',
        'FUNCION',
        'FUNCION_NOMBRE',
        'DIVISION_FUNCIONAL',
        'DIVISION_FUNCIONAL_NOMBRE',
        'GRUPO_FUNCIONAL',
        'GRUPO_FUNCIONAL_NOMBRE',
        'META',
        'FINALIDAD',
        'META_NOMBRE',
        'DEPARTAMENTO_META',
        'DEPARTAMENTO_META_NOMBRE',
        'FUENTE_FINANC',
        'FUENTE_FINANC_NOMBRE',
        'RUBRO',
        'RUBRO_NOMBRE',
        'TIPO_RECURSO',
        'TIPO_RECURSO_NOMBRE',
        'CATEG_GASTO',
        'CATEG_GASTO_NOMBRE',
        'TIPO_TRANSACCION',
        'GENERICA',
        'GENERICA_NOMBRE',
        'SUBGENERICA',
        'SUBGENERICA_NOMBRE',
        'SUBGENERICA_DET',
        'SUBGENERICA_DET_NOMBRE',
        'ESPECIFICA',
        'ESPECIFICA_NOMBRE',
        'ESPECIFICA_DET',
        'ESPECIFICA_DET_NOMBRE',
        'MONTO_PIA',
        'MONTO_PIM',
        'MONTO_CERTIFICADO',
        'MONTO_COMPROMETIDO_ANUAL',
        'MONTO_COMPROMETIDO',
        'MONTO_DEVENGADO',
        'MONTO_GIRADO' 
    ],
    
    file_fields :   [
        "ANO_EJE",
        "MES_EJE",
        "NIVEL_GOBIERNO",
        "NIVEL_GOBIERNO_NOMBRE",
        "SECTOR",
        "SECTOR_NOMBRE",
        "PLIEGO",
        "PLIEGO_NOMBRE",
        "SEC_EJEC",
        "EJECUTORA",
        "EJECUTORA_NOMBRE",
        "DEPARTAMENTO_EJECUTORA",
        "DEPARTAMENTO_EJECUTORA_NOMBRE",
        "PROVINCIA_EJECUTORA",
        "PROVINCIA_EJECUTORA_NOMBRE",
        "DISTRITO_EJECUTORA",
        "DISTRITO_EJECUTORA_NOMBRE",
        "SEC_FUNC",
        "PROGRAMA_PPTO",
        "PROGRAMA_PPTO_NOMBRE",
        "TIPO_ACT_PROY",
        "TIPO_ACT_PROY_NOMBRE",
        "PRODUCTO_PROYECTO",
        "PRODUCTO_PROYECTO_NOMBRE",
        "ACTIVIDAD_ACCION_OBRA",
        "ACTIVIDAD_ACCION_OBRA_NOMBRE",
        "FUNCION",
        "FUNCION_NOMBRE",
        "DIVISION_FUNCIONAL",
        "DIVISION_FUNCIONAL_NOMBRE",
        "GRUPO_FUNCIONAL",
        "GRUPO_FUNCIONAL_NOMBRE",
        "META",
        "FINALIDAD",
        "META_NOMBRE",
        "DEPARTAMENTO_META",
        "DEPARTAMENTO_META_NOMBRE",
        "FUENTE_FINANCIAMIENTO",
        "FUENTE_FINANCIAMIENTO_NOMBRE",
        "RUBRO",
        "RUBRO_NOMBRE",
        "TIPO_RECURSO",
        "TIPO_RECURSO_NOMBRE",
        "CATEGORIA_GASTO",
        "CATEGORIA_GASTO_NOMBRE",
        "TIPO_TRANSACCION",
        "GENERICA",
        "GENERICA_NOMBRE",
        "SUBGENERICA",
        "SUBGENERICA_NOMBRE",
        "SUBGENERICA_DET",
        "SUBGENERICA_DET_NOMBRE",
        "ESPECIFICA",
        "ESPECIFICA_NOMBRE",
        "ESPECIFICA_DET",
        "ESPECIFICA_DET_NOMBRE",
        "MONTO_PIA",
        "MONTO_PIM",
        "MONTO_CERTIFICADO",
        "MONTO_COMPROMETIDO_ANUAL",
        "MONTO_COMPROMETIDO",
        "MONTO_DEVENGADO",
        "MONTO_GIRADO",
      ],

    buildQueryLineValues : (data_line, lines) => {
        let code = data_line[22]

        const valid_code = (value) => value.codigo_cui == code;

        if(lines.valid_codes.some(valid_code)){
            data_line = data_line.map((field) => field.replaceAll("'","''"))
            lines.actual_sql.push(`( '${data_line.join("', '")}' )`)
        }
    },

    getDateTimeString : () => {
        let today = new Date();
        let date = today.getFullYear().toString().padStart(2, '0')+'-'+(today.getMonth()+1).toString().padStart(2, '0')+'-'+today.getDate().toString().padStart(2, '0');
        let time = today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0') + ":" + today.getSeconds().toString().padStart(2, '0');
        let dateTime = date+' '+time;
        
        return dateTime;
    },

    getDateTimeString : () => {
        let today = new Date();
        let date = today.getFullYear().toString().padStart(2, '0')+'-'+(today.getMonth()+1).toString().padStart(2, '0')+'-'+today.getDate().toString().padStart(2, '0');
        let time = today.getHours().toString().padStart(2, '0') + ":" + today.getMinutes().toString().padStart(2, '0') + ":" + today.getSeconds().toString().padStart(2, '0');
        let dateTime = date+' '+time;
        
        return dateTime;
    },

    updateLineInfo : (sql_head, lines, request) => {
        let insert_query = sql_head+lines.actual_sql.join(', ');
                            
        lines.history_sql.push(lines.actual_sql)
        lines.actual_sql = []

        request.query(insert_query, (err) => {                                
            if(err){
                console.log(lines.times_saved + "° : Error save data - " + err)   
            } else {
                lines.times_saved++ 
                console.log(lines.times_saved + "° : succesully save data " + utils.getDateTimeString())
            }
              
        })
    },

    writeLog : (times, err, data) => {
        const timestamp = new Date().toISOString();
        const log_message = `${timestamp} - ${err}\n`;
        const log_insert_query = data.join(', \n')
        const log_data = log_message + log_insert_query
        const file_name = `logs/${times}-${timestamp}.log`

        fs.appendFile(file_name, log_data, (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de registro de log:', err);
            }
        })
    }

}



