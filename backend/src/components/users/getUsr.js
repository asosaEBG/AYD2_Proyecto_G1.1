const view_on_cognito = require("../../helpers/cognito/view");

const getUsr = async (req, res) => {
  await view_on_cognito
    .getUserAttributesBySub(req.userData.sub)
    .then((response_cognito) => {
      return res.status(200).json({ cognito: response_cognito });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  getUsr,
};
