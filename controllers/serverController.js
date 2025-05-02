const serverService = require("../services/serverService");

const serverController = {
  getServerHealth: async (req, res) => {
    const result = await serverService.getServerHealth(req);
    res.status(result.statusCode).json(result);
  }
};

module.exports = serverController;
