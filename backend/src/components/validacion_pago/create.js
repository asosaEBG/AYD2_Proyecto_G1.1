const query_format = require("../../helpers/database/mysql/operation/queryFormat");
const createValidacionPago = async (req, res) => {
  const { colaborador_id, pago_id } = req.body;
  query_format
    .queryFormatWithTransaction(
      `INSERT INTO proyecto.validacion_pago
      ( fecha_registro, fecha_update, colaborador_id, pago_id)
      VALUES( current_timestamp(), current_timestamp(), ?, ?);`,
      [colaborador_id, pago_id]
    )
    .then((response_database) => {
      return res.status(200).json({response_database});
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  createValidacionPago,
};
