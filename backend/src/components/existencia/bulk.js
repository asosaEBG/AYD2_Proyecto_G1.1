const query_format = require("../../helpers/database/mysql/operation/queryFormat");
const { v4 } = require("uuid");

const createExistenciaBulk = async (req, res) => {
  const { cantidad, producto_id, estado_existencia_id, ingreso_mercaderia_id } =
    req.body;
  let querys = Array.from({ length: cantidad }, (_, index) => ({
    query: `INSERT INTO proyecto.existencia
 (correlativo, producto_id, estado_existencia_id, ingreso_mercaderia_id)
 VALUES(?, ?, ?, ?);`,
    inserts: [v4(), producto_id, estado_existencia_id, ingreso_mercaderia_id],
  }));
  query_format
    .queryFormatWithTransactionArray(querys)
    .then((response_database) => {
      return res.status(200).json({ response_database });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  createExistenciaBulk,
};