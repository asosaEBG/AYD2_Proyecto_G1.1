const read_on_cognito = require("../../helpers/cognito/read");

const readUsers = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    await read_on_cognito
      .listCognitoUsers()
      .then((response_cognito) => {
        return res.status(200).json({ result: response_cognito });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ log: error });
      });
  });
};

module.exports = {
  readUsers,
};
