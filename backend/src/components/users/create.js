const register_on_cognito = require("../../helpers/cognito/create");
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  await register_on_cognito
    .verifyUsr({
      username: username,
      email: email,
    })
    .then(async (response_verify_usr) => {
      if (!response_verify_usr.found) {
        await register_on_cognito
          .create({
            username: username,
            email: email,
            password: password,
          })
          .then(async (response_cognito) => {
            return res.status(200).json({ cognito: response_cognito });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ log: error });
          });
      } else {
        return res
          .status(200)
          .json({ usuario_repetido: true, msg: response_verify_usr.msg });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  createUser,
};
