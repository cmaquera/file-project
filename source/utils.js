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
        'DEPARTAMENTO_EJECUTORA_NOMBR',
        'PROVINCIA_EJECUTORA',
        'PROVINCIA_EJECUTORA_NOMBRE',
        'DISTRITO_EJECUTORA',
        'DISTRITO_EJECUTORA_NOMBRE',
        'SEC_FUNC',
        'PROGRAMA_PPTO',
        'PROGRAMA_PPTO_NOMBRE',
        'TIPO_ACT_PROY',
        'PRODUCTO_PROYECTO',
        'PRODUCTO_PROYECTO_NOMBRE',
        'ACTIVIDAD_ACCION_OBRA',
        'ACTIVIDAD_ACCION_OBRA_NOMBRE,',
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
        'MONTO_GIRADO',
        'TIPO_ACT_PROY_NOMBR' 
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

    buildQueryLineValues : (line, valid_codes, amount_valid_lines) => {
        let code = line[22]
        let sql_value = ''

        const valid_code = (value) => value.codigo_cui == code;

        if(valid_codes.some(valid_code)){
            sql_value = `( "${line.join('", "')}" ),`
            amount_valid_lines++
        }


        return sql_value
    },
    getDateTimeString : () => {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;
        
        return dateTime;
    }


    // buildQueryLineValues : (line, valid_codes) => {
    //     let is_valid = valid_codes.find( code => code.codigo_cui == line[]);
        
    //     if (is_valid !== undefined){
    //         return sql_value = `(
    //             ${ ANO_EJE },
    //             ${ MES_EJE },
    //             ${ TIPO_GOBIERNO },
    //             ${ TIPO_GOBIERNO_NOMBRE },
    //             ${ SECTOR },
    //             ${ SECTOR_NOMBRE },
    //             ${ PLIEGO },
    //             ${ PLIEGO_NOMBRE },
    //             ${ SEC_EJEC },
    //             ${ EJECUTORA },
    //             ${ EJECUTORA_NOMBRE },
    //             ${ DEPARTAMENTO_EJECUTORA },
    //             ${ DEPARTAMENTO_EJECUTORA_NOMBRE },
    //             ${ PROVINCIA_EJECUTORA },
    //             ${ PROVINCIA_EJECUTORA_NOMBRE },
    //             ${ DISTRITO_EJECUTORA },
    //             ${ DISTRITO_EJECUTORA_NOMBRE },
    //             ${ SEC_FUNC },
    //             ${ PROGRAMA_PPTO },
    //             ${ PROGRAMA_PPTO_NOMBRE },
    //             ${ TIPO_ACT_PROY },		
    //             ${ PRODUCTO_PROYECTO },
    //             ${ PRODUCTO_PROYECTO_NOMBRE },
    //             ${ ACTIVIDAD_ACCION_OBRA },
    //             ${ ACTIVIDAD_ACCION_OBRA_NOMBRE },
    //             ${ FUNCION },
    //             ${ FUNCION_NOMBRE },
    //             ${ DIVISION_FUNCIONAL },
    //             ${ DIVISION_FUNCIONAL_NOMBRE },
    //             ${ GRUPO_FUNCIONAL },
    //             ${ GRUPO_FUNCIONAL_NOMBRE },
    //             ${ META },
    //             ${ FINALIDAD },
    //             ${ META_NOMBRE },
    //             ${ DEPARTAMENTO_META },
    //             ${ DEPARTAMENTO_META_NOMBRE },
    //             ${ FUENTE_FINANC },
    //             ${ FUENTE_FINANC_NOMBRE },
    //             ${ RUBRO },
    //             ${ RUBRO_NOMBRE },
    //             ${ TIPO_RECURSO },
    //             ${ TIPO_RECURSO_NOMBRE },
    //             ${ CATEG_GASTO },
    //             ${ CATEG_GASTO_NOMBRE },
    //             ${ TIPO_TRANSACCION },
    //             ${ GENERICA },
    //             ${ GENERICA_NOMBRE },
    //             ${ SUBGENERICA },
    //             ${ SUBGENERICA_NOMBRE },
    //             ${ SUBGENERICA_DET },
    //             ${ SUBGENERICA_DET_NOMBRE },
    //             ${ ESPECIFICA },
    //             ${ ESPECIFICA_NOMBRE },
    //             ${ ESPECIFICA_DET },
    //             ${ ESPECIFICA_DET_NOMBRE },
    //             ${ MONTO_PIA },
    //             ${ MONTO_PIM },
    //             ${ MONTO_CERTIFICADO },
    //             ${ MONTO_COMPROMETIDO_ANUAL },
    //             ${ MONTO_COMPROMETIDO },
    //             ${ MONTO_DEVENGADO },
    //             ${ MONTO_GIRADO },
    //             ${ TIPO_ACT_PROY_NOMBRE },
    //         ),`
    //     } else {
    //         return '';
    //     }
    // }

}


// ${ ANO_EJE },
// ${ MES_EJE },
// ${ TIPO_GOBIERNO },
// ${ TIPO_GOBIERNO_NOMBRE },
// ${ SECTOR },
// ${ SECTOR_NOMBRE },
// ${ PLIEGO },
// ${ PLIEGO_NOMBRE },
// ${ SEC_EJEC },
// ${ EJECUTORA },
// ${ EJECUTORA_NOMBRE },
// ${ DEPARTAMENTO_EJECUTORA },
// ${ DEPARTAMENTO_EJECUTORA_NOMBRE },
// ${ PROVINCIA_EJECUTORA },
// ${ PROVINCIA_EJECUTORA_NOMBRE },
// ${ DISTRITO_EJECUTORA },
// ${ DISTRITO_EJECUTORA_NOMBRE },
// ${ SEC_FUNC },
// ${ PROGRAMA_PPTO },
// ${ PROGRAMA_PPTO_NOMBRE },
// ${ TIPO_ACT_PROY },		
// ${ PRODUCTO_PROYECTO },
// ${ PRODUCTO_PROYECTO_NOMBRE },
// ${ ACTIVIDAD_ACCION_OBRA },
// ${ ACTIVIDAD_ACCION_OBRA_NOMBRE },
// ${ FUNCION },
// ${ FUNCION_NOMBRE },
// ${ DIVISION_FUNCIONAL },
// ${ DIVISION_FUNCIONAL_NOMBRE },
// ${ GRUPO_FUNCIONAL },
// ${ GRUPO_FUNCIONAL_NOMBRE },
// ${ META },
// ${ FINALIDAD },
// ${ META_NOMBRE },
// ${ DEPARTAMENTO_META },
// ${ DEPARTAMENTO_META_NOMBRE },
// ${ FUENTE_FINANC },
// ${ FUENTE_FINANC_NOMBRE },
// ${ RUBRO },
// ${ RUBRO_NOMBRE },
// ${ TIPO_RECURSO },
// ${ TIPO_RECURSO_NOMBRE },
// ${ CATEG_GASTO },
// ${ CATEG_GASTO_NOMBRE },
// ${ TIPO_TRANSACCION },
// ${ GENERICA },
// ${ GENERICA_NOMBRE },
// ${ SUBGENERICA },
// ${ SUBGENERICA_NOMBRE },
// ${ SUBGENERICA_DET },
// ${ SUBGENERICA_DET_NOMBRE },
// ${ ESPECIFICA },
// ${ ESPECIFICA_NOMBRE },
// ${ ESPECIFICA_DET },
// ${ ESPECIFICA_DET_NOMBRE },
// ${ MONTO_PIA },
// ${ MONTO_PIM },
// ${ MONTO_CERTIFICADO },
// ${ MONTO_COMPROMETIDO_ANUAL },
// ${ MONTO_COMPROMETIDO },
// ${ MONTO_DEVENGADO },
// ${ MONTO_GIRADO },
// ${ TIPO_ACT_PROY_NOMBRE },

// [ANO_EJE,
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
// TIPO_ACT_PROY_NOMBRE]

