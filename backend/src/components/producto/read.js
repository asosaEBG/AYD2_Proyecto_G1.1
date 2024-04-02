const query = require("../../helpers/database/mysql/operation/query");

const readProducto = async (req, res) => {
  query
    .query(
      `    
      SELECT 
            producto.id, 
            CONVERT(nombre,CHAR) AS nombre,
            CONVERT(descripcion,CHAR) AS descripcion,
            CONVERT(portada,CHAR) AS portada,
            precio,
            DATE_FORMAT(producto.fecha_registro,"%d/%m/%Y %r") AS fecha_registro, 
            DATE_FORMAT(producto.fecha_update,"%d/%m/%Y %r") AS fecha_update,
            categoria_producto_id,
            proveedor_id,            
            costo,
            CONVERT(proveedor.nombre, CHAR) as proveedor,
            CONVERT(categoria_producto.descripcion, CHAR) as categoria_producto
      FROM proyecto.producto
      INNER JOIN categoria_producto on producto.categoria_producto_id = categoria_producto.id
      INNER JOIN proveedor on producto.proveedor_id = proveedor.id
      ;
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
  readProducto,
};
