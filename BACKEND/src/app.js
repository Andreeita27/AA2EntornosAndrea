const express = require('express');
const cors = require('cors');
const db = require('./models/db');
const autoresRoutes = require('./routes/autores.routes');
const librosRoutes = require('./routes/libros.routes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/autores', autoresRoutes);
app.use('/api/libros', librosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend iniciado en http://localhost:${PORT}`);
});
