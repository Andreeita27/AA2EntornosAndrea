const express = require('express');
const cors = require('cors');
const { config } = require('./config/configuration');
const db = require('./models/db');
const autoresRoutes = require('./routes/autores.routes');
const librosRoutes = require('./routes/libros.routes');

const app = express();
const PORT = config.service.port || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/autores', autoresRoutes);
app.use('/api/libros', librosRoutes);

app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

app.listen(PORT, () => {
  console.log(`Servidor backend iniciado en http://localhost:${PORT}`);
});