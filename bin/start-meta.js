const { tryParseInt } = require("@xylabs/sdk-api-express-ecs")
const { metaServer } = require("../dist/node")

const port = tryParseInt(process.env.PORT) || 8083
metaServer(port)
