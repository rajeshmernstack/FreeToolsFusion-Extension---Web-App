const connection = require("../config");
var path = require("path");

const getAllSites = (req, res) => {
  connection.query(
    "SELECT cookie_id, app_icon, app_name, app_url FROM cookies",
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
  const cid = req.params.cid;
  connection.query(
    `SELECT * FROM cookies WHERE cookie_id = '${cid}'`,
    (error, results, fields) => {
      if (error) {
        res.json({ success: false, error: error });
      } else {
        res.json({ success: true, data: results[0] });
      }
    }
  );
};

const deleteAppCookie = (req, res) => {
  const cookieId = req.params.cid;

  connection.query(
    `DELETE FROM cookies WHERE cookie_id = ${cookieId}`,
    (error, results, fields) => {
      if (error) {
        res.json({ success: false });
      } else {
        res.json({ success: true });
      }
    }
  );
};

const addCookies = (req, res) => {
  let { app_name, app_cookies, app_url } = req.body;
  // app_cookies = JSON.stringify(app_cookies);

  const app_icon = req.files.app_icon;
  const app_icon_path = "/assets/icons/" + app_icon.name;

  const data = {
    app_icon: app_icon_path,
    app_name,
    app_url,
    app_cookies,
  };
  const uploadFilePath = path.resolve(
    __dirname,
    "../public/assets/icons",
    app_icon.name
  );
  app_icon.mv(uploadFilePath, function (err) {
    if (err) {
      res.json({ status: false });
    } else {
      connection.query(
        `INSERT INTO cookies SET ?`,
        data,
        function (error, results, fields) {
          if (error) {
            res.json({ success: false });
          } else {
            res.json({ success: true });
          }
        }
      );
    }
  });
};

module.exports = {
  getAllSites,
  getAppCookie,
  deleteAppCookie,
  addCookies,
};
