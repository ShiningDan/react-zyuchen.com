let path = require('path');


exports.home = function(req, res) {
  res.sendFile(path.join(__dirname, "../../www/static/html/index.html"));
}