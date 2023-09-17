const express = require('express');
const app = express();
const port = 3000

app.use(express.json());

const validacionMethodsHTTP = (req, res, next) => {
  const validarMethods = ['GET', 'POST', 'PUT', 'DELETE']

  if (!validarMethods.includes(req.method)) {
    return res.status(405).json({error: "Metodo HTTP no valido"})
  }
  next()
};

app.use(validacionMethodsHTTP);

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
