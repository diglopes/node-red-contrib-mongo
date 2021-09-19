module.exports = function(RED) {
    function mongoIn(config) {
        RED.nodes.createNode(this, config)
        const node = this
        node.on("input", function(msg) {
            node.send(msg)
        })

        node.on("close", function() {
            console.log("NODE HAS BEEN CLOSED");
        })
    }

    RED.nodes.registerType("mongo-in", mongoIn)
}