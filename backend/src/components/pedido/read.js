const query = require("../../helpers/database/mysql/operation/query");

const readPedido = async (req, res) => {
  query
    .query(
      `    
      SELECT 
          id,
          DATE_FORMAT(pedido.fecha_registro,"%d/%m/%Y %r") AS fecha_registro,
          DATE_FORMAT(pedido.fecha_update,"%d/%m/%Y %r") AS fecha_update,
          correlativo,
          estado_pedido_id,
          oferta_id,
          cliente_id
      FROM proyecto.pedido;
    `
    )
    .then((response_database) => {
      return res.status(200).json({
        response_database,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  readPedido,
};
