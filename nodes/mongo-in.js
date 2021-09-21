const { connect } = require("../lib/mongo");

module.exports = function (RED) {
  function mongoIn(config) {
    RED.nodes.createNode(this, config);
    this.mongoConfig = RED.nodes.getNode(config.mongoConfig)
    const node = this;
    const connString = node.mongoConfig.url
    
    node.status({ fill: "grey", shape: "ring", text: "connecting" })

    connect(connString)
      .then(() => {
        node.status({ fill: "green", shape: "dot", text: "connected" });
      })
      .catch(() => {
        node.status({ fill: "red", shape: "ring", text: "disconnected" });
      });

    // Input message event handler
    node.on("input", function (msg) {
      node.send(msg);
    });

    // Closing event handler
    node.on("close", function () {
        node.status({})
    });
  }

  RED.nodes.registerType("mongo-in", mongoIn);
};
