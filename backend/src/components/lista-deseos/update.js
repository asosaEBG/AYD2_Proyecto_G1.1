const dinamodb = require("../../helpers/database/dynamodb/dynamodb");
const moment = require("moment-timezone");
const updateListaDeseos = async (req, res) => {
  const { id } = req.params;
  const { lista_deseos } = req.body;
  const fecha_actualizacion = moment(new Date())
    .tz("America/Guatemala")
    .format();
  let UpdateExpression = `set fecha_actualizacion =:fecha_actualizacion`;
  let ExpressionAttributeValues = {
    ":fecha_actualizacion": fecha_actualizacion,
  };
  if (lista_deseos) {
    UpdateExpression += `, lista_deseos =:lista_deseos`;
    ExpressionAttributeValues[":lista_deseos"] = lista_deseos;
  }
  await dinamodb
    .updateObject(
      "lista-deseos",
      { id },
      UpdateExpression,
      ExpressionAttributeValues
    )
    .then((response_database) => {
      return res.status(200).json({
        response_database,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

module.exports = {
  updateListaDeseos,
};
