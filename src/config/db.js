const { Pool } = require("pg")


module.exports = new Pool({

    user: 'postgres',
    password: "fran2013ms",
    host: "localhost",
    port: 5432,
    database: "gymmanager"

})