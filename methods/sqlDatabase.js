const sql = require("mssql");
//console.log(sql);
var config = {  
    user:'admin',
    password:'admin',
    server: 'DESKTOP-LTHH2JM\\SQLEXPRESS01', 
    database: 'Ecommerce',
    options:
     { 
        trustServerCertificate: true   
    }   
}
async function newConnectionSQL(query)
{
    
    const pool = await sql.connect(config);
    const result = await pool.request().query(query);
    await pool.close();
    
    return result;
}
//newConnectionSQL()

module.exports={newConnectionSQL};