const query_format = require("../../helpers/database/mysql/operation/queryFormat");
const viewPedido = async (req, res) => {
  const { id } = req.params;
  query_format
    .queryFormat(
      `
      SELECT 
          id,
          fecha_registro,
          fecha_update,
          DATE_FORMAT(pedido.fecha_registro,"%d/%m/%Y %r") AS fechaRegistro,
          DATE_FORMAT(pedido.fecha_update,"%d/%m/%Y %r") AS fechaUpdate,
          correlativo,
          estado_pedido_id,
          oferta_id,
          cliente_id
      FROM proyecto.pedido;
      where pedido.id = ?
`,
      [id]
    )
    .then((response_database) => {
      if (response_database.result.length > 0) {
        return res.status(200).json({
          response_database,
        });
      } else {
        return res.status(200).json({ log: "PEDIDO NO ENCONTRADO" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ log: error });
    });
};

module.exports = {
  viewPedido,
};
