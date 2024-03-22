const update_on_cognito = require("../../helpers/cognito/update");
const view_on_cognito = require("../../helpers/cognito/view");
const updateUser = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params.id;
  await view_on_cognito
    .getUserAttributesBySub(id)
    .then(async (response_usr_info) => {
      await update_on_cognito
        .update({
          username: response_usr_info.Username,
          email: email,
        })
        .then((response_cognito) => {
          return res.status(200).json({ cognito: response_cognito });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ log: error });
        });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  updateUser,
};
