const express = require('express');
const app = express();
const port = 3000

app.use(express.json())

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
