const view_on_cognito = require("../../helpers/cognito/view");
const viewUser = async (req, res) => {
  const { id } = req.params;
  await view_on_cognito
    .getUserAttributesBySub(id)
    .then((response_cognito) => {
      return res.status(200).json({ response: { result: response_cognito } });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  viewUser,
};
