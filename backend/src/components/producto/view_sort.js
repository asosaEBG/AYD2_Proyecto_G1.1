const query_format = require("../../helpers/database/mysql/operation/queryFormat");

const viewProductoSort = async (req, res) => {
  const { name, precio, fecha_lanzamiento } = req.params;
  const lowerName = name.toLowerCase();
  console.log("[LOWER NAME]", lowerName);
  query_format
    .queryFormat(
      `    
      SELECT 
            producto.id, 
            CONVERT(producto.nombre,CHAR) AS nombre,
            CONVERT(producto.descripcion,CHAR) AS descripcion,
            CONVERT(producto.portada,CHAR) AS portada,
            producto.precio,
            DATE_FORMAT(producto.fecha_registro,"%d/%m/%Y %r") AS fecha_registro, 
            DATE_FORMAT(producto.fecha_update,"%d/%m/%Y %r") AS fecha_update,
            producto.categoria_producto_id,
            producto.proveedor_id,            
            producto.costo,
            CONVERT(proveedor.nombre, CHAR) as proveedor,
            CONVERT(categoria_producto.descripcion, CHAR) as categoria_producto
      FROM proyecto.producto
      INNER JOIN categoria_producto on producto.categoria_producto_id = categoria_producto.id
      INNER JOIN proveedor on producto.proveedor_id = proveedor.id
      where LOWER(CONVERT(producto.nombre,CHAR)) like '%${lowerName}%'
      ORDER BY producto.precio ${precio}, producto.fecha_registro ${fecha_lanzamiento}
      ;
    `,
      []
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
  viewProductoSort,
};