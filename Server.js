const express = require('express');
const app = express();
const port = 3000
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

app.use(express.json());

const validarTokenJWT = (req, res, next) => {
  const token = req.header('Authorization'); 

  if (!token) {
    return res.status(401).json({error: 'Token de autorizacion faltante'})
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    return res.status(401).json({error: 'Token de autorizacion invalido'})
  }
}

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

app.post('/login', (req, res) => {
  const { username, password } = req.body
  const users = [
    {username: 'Tomas_Ricaurte', password: '1234509876'},
    {username: 'Juanito_Alimaña', password: '0987654321'}
  ]

  const user = users.find((u) => u.username === username && u.password === password)

  if (!user) {
    return res.status(401).json({error: 'Credenciales incorrectas'})
  } 

  const payload = {
    user: {
      username: user.username
    }
  }

  jwt.sign(payload,  process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
    if (err) {
      return res.status(500).json({error: 'Error al generar el token'})
    }
    res.json({token})
  })
})

app.get('/ruta-protegida', validarTokenJWT, (req, res) => {
  res.json({ mensaje: 'Ruta protegida alcanzada con éxito' });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
