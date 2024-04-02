const query_format = require("../../helpers/database/mysql/operation/queryFormat");

const createDetallePedido = async (req, res) => {
  const { cantidad, pedido_id, producto_id} = req.body;
  query_format
    .queryFormatWithTransaction(
      `INSERT INTO proyecto.detalle_pedido
      ( fecha_registro, fecha_update, cantidad, pedido_id, producto_id)
      VALUES( current_timestamp(), current_timestamp(), ?, ?, ?);`,
      [cantidad, pedido_id, producto_id]
    )
    .then((response_database) => {
      return res.status(200).json({ response_database });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  createDetallePedido,
};
