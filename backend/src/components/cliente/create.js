const query_format = require("../../helpers/database/mysql/operation/queryFormat");
const register_on_cognito = require("../../helpers/cognito/create");
const createCliente = async (req, res) => {
  const {
    nombre,
    apellido,
    fotografia,
    celular,
    direccion_entrega,
    email,
    username,
    password,
  } = req.body;

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
            query_format
              .queryFormatWithTransactionArray([
                {
                  query: `INSERT INTO proyecto.usuario
                (cognito_sub, estado_usuario_id, tipo_usuario_id)
                VALUES( ?, 1, 3);`,
                  inserts: [response_cognito.response.UserSub],
                },
                {
                  query: `INSERT INTO proyecto.cliente
                  ( nombre, apellido, fotografia, celular, usuario_id, direccion_entrega)
                  VALUES( ?, ?, ?, ?, LAST_INSERT_ID(), ?);`,
                  inserts: [
                    nombre,
                    apellido,
                    fotografia,
                    celular,
                    direccion_entrega,
                  ],
                },
              ])
              .then((response_database) => {
                return res.status(200).json({
                  cognito: response_cognito,
                  database: response_database,
                });
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
  createCliente,
};
