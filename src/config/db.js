const { Pool } = require("pg")


module.exports = new Pool({

    user: 'zsgghmcmfsnqlu',
    password: "e595bc9d9768aade4f4a53cc2d72b426820c90f40493550a7481e95e4ea12126",
    host: "ec2-18-235-97-230.compute-1.amazonaws.com",
    port: 5432,
    database: "d4olue1n6c37um",
    ssl: {
        rejectUnauthorized: false
    }
})