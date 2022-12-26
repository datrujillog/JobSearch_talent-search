const DataBase = require("./bootstrap/DataBase.bootstrap");
const Server = require("./bootstrap/Server.bootstrap");

const server = new Server();
const dataBase = new DataBase();

(async function initServer() {
  try {
    await server.initServer();
    const infoDatabase = await dataBase.initialize();
    await dataBase.initializeData()
    console.log(`connected to dataBase ${infoDatabase.connections[0].name}`);
  } catch (error) {
    await dataBase.closeConnection()
    console.log(error);
  }
})();
