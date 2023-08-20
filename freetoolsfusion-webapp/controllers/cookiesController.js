const connection = require("../config");

const getAllSites = (req, res) => {
  connection.query(
    "SELECT cookie_id, app_icon, app_name FROM cookies",
    (error, results, fields) => {
      if (error) {
        res.json({ success: false });
      } else {
        res.json({ success: true, count: results.length, data: results });
      }
    }
  );
};

const getAppCookie = (req, res) => {
  const appName = req.params.appname;
  connection.query(
    `SELECT * FROM cookies WHERE app_name = '${appName}'`,
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error});
      } else {
        res.json({ success: true, data: results });
      }
    }
  );
};

module.exports = {
  getAllSites,
  getAppCookie,
};
