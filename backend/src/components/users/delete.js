const view_on_cognito = require("../../helpers/cognito/view");
const delete_on_cognito = require("../../helpers/cognito/delete");
const deleteUser = async (req, res) => {
  const { rows } = req.body;
  if (rows.length > 0) {
    let responses = [];
    rows.map(async (actual, index) => {
      await view_on_cognito
        .getUserAttributesBySub(actual)
        .then(async (response_usr_info) => {
          await delete_on_cognito
            .delete_cognito(response_usr_info.Username)
            .then((response_cognito) => {
              responses.push(response_cognito);
              if (index == rows.length - 1) {
                return res.status(200).json({ cognito: response_cognito });
              }
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
    });
  } else {
    return res.status(200).json({ msg: "NO DATA PROVIDED" });
  }
};

module.exports = {
  deleteUser,
};
