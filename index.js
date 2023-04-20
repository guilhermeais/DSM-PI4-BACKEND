const server = require("./server");
const blipp = require ('blipp');
const connect = require('./src/database/db');
require('dotenv').config();


(async () =>{
    // await connect.connect()
    await server.register(blipp)
    await server.start();
    console.log("Server started %s", server.info.uri);
})();