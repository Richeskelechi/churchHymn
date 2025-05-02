const { response } = require('../response/response');

const serverService = {
  getServerHealth: async (req) => {
    return response(200, "Healthy Church Hymn Server", null, "Success", req.apiId);
  }
};

module.exports = serverService;
