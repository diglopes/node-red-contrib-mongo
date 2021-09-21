const { MongoClient } = require("mongodb")

// TODO
function disconnect() {

}

function connect(connString) {
    const client = new MongoClient(connString)
    return client.connect()
}

module.exports = {
    connect
}