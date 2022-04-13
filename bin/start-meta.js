const { metaServer } = require("../dist/node")

const port = process.env.PORT ? parseInt(process.env.PORT) : 8083 
metaServer(port)
