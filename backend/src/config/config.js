require("dotenv").config() 

const config={
    port: process.env.PORT,
    connection_string: process.env.CONNECTION_STRING,
    private_jwt:process.env.PRIVATE_JWT
}

module.exports={
    config
}