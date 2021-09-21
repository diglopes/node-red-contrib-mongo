const constants = require("../lib/constants")

module.exports = function (RED) {
  function mongoConfig(config) {
    RED.nodes.createNode(this, config);

    const { hostname, port, db, connectOptions } = config;
    const { user, password } = this.credentials
    const topology = constants.topology[config.topology]

    const isClustered = topology !== constants.topology.DIRECT

    let url = topology
    this.topology = topology;
    this.hostname = hostname;
    this.port = port;
    this.db = db;
    this.connectOptions = connectOptions;
    this.name = config.name;

    if(user && password) url += `${user}:${password}@`

    url += isClustered ? `${hostname}/${db}` : `${hostname}:${port}/${db}`
    
    if(connectOptions) url += `?${connectOptions}`

    this.url = url
  }

  RED.nodes.registerType("mongo-config", mongoConfig, {
    credentials: {
      user: { type: "text" },
      password: { type: "password" },
    },
  });
};
