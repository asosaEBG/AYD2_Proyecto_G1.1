const query = require("../../helpers/database/mysql/operation/query");

const readMetodoPago = async (req, res) => {
  query
    .query(
      `    
      SELECT 
        id, 
        tipo_metodo_pago_id,
        cliente_id,
        detalle_tarjeta_id,
        DATE_FORMAT(fecha_registro, "%d/%m/%Y %r") as fecha_registro,
        DATE_FORMAT(fecha_update, "%d/%m/%Y %r") as fecha_update
      FROM proyecto.metodo_pago;
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
  readMetodoPago,
};
