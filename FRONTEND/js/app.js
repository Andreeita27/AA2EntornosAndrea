// Cargar autores al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarAutores();
    cargarLibros();
    // Capturar el envío del formulario de autores
document.getElementById('formAutor').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const id = document.getElementById('autorId').value;
    const nombre = document.getElementById('nombre').value;
    const nacionalidad = document.getElementById('nacionalidad').value;
    const fecha_nacimiento = document.getElementById('fecha_nacimiento').value;
  
    const datos = {
      nombre,
      nacionalidad,
      fecha_nacimiento,
    };
  
    // Si hay ID, es edición; si no, es nuevo
    const metodo = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:3000/api/autores/${id}`
      : 'http://localhost:3000/api/autores';
  
    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then(res => res.json())
      .then(() => {
        // Resetear formulario y recargar lista
        this.reset();
        document.getElementById('autorId').value = '';
        cargarAutores();
      });
  });   
  });

  document.getElementById('formLibro').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const id = document.getElementById('libroId').value;
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const anio_publicacion = parseInt(document.getElementById('anio_publicacion').value);
    const autor_id = parseInt(document.getElementById('autor_id').value);
  
    const datos = {
      titulo,
      genero,
      anio_publicacion,
      autor_id
    };
  
    const metodo = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:3000/api/libros/${id}`
      : 'http://localhost:3000/api/libros';
  
    fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    })
      .then(res => res.json())
      .then(() => {
        this.reset();
        document.getElementById('libroId').value = '';
        cargarLibros();
      });
  });
  
  
  // Función para cargar todos los autores
  function cargarAutores() {
    fetch('http://localhost:3000/api/autores')
      .then(res => res.json())
      .then(autores => {
        const tbody = document.querySelector('#tablaAutores tbody');
        const selectAutores = document.getElementById('autor_id');
        tbody.innerHTML = '';
        selectAutores.innerHTML = '<option value="">Seleccionar autor</option>';
  
        autores.forEach(autor => {
          // Añadir a tabla
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${autor.nombre}</td>
            <td>${autor.nacionalidad}</td>
            <td>${autor.fecha_nacimiento}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick='editarAutor(${autor.id}, ${JSON.stringify(autor.nombre)}, ${JSON.stringify(autor.nacionalidad)}, ${JSON.stringify(autor.fecha_nacimiento)})'>Editar</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarAutor(${autor.id})">Eliminar</button>
            </td>
        `;

          
          tbody.appendChild(fila);
  
          // Añadir al select del formulario de libros
          const option = document.createElement('option');
          option.value = autor.id;
          option.textContent = autor.nombre;
          selectAutores.appendChild(option);
        });
      });
  }

  // Función para editar un autor
  function editarAutor(id, nombre, nacionalidad, fecha_nacimiento) {
    document.getElementById('autorId').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('nacionalidad').value = nacionalidad;
    document.getElementById('fecha_nacimiento').value = fecha_nacimiento;
  }

  // Función para eliminar un autor
  function eliminarAutor(id) {
    if (!confirm('¿Estás segura de que quieres eliminar este autor?')) return;
  
    fetch(`http://localhost:3000/api/autores/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        cargarAutores();
      });
  }

  function cargarLibros() {
    fetch('http://localhost:3000/api/libros')
      .then(res => res.json())
      .then(libros => {
        const tbody = document.querySelector('#tablaLibros tbody');
        tbody.innerHTML = '';
  
        libros.forEach(libro => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.genero}</td>
            <td>${libro.anio_publicacion}</td>
            <td>${libro.autor_nombre || 'Desconocido'}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick='editarLibro(${libro.id}, ${JSON.stringify(libro.titulo)}, ${JSON.stringify(libro.genero)}, ${libro.anio_publicacion}, ${libro.autor_id})'>Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarLibro(${libro.id})">Eliminar</button>
            </td>
          `;
          tbody.appendChild(fila);
        });
      });
  }
  
  function editarLibro(id, titulo, genero, anio_publicacion, autor_id) {
    document.getElementById('libroId').value = id;
    document.getElementById('titulo').value = titulo;
    document.getElementById('genero').value = genero;
    document.getElementById('anio_publicacion').value = anio_publicacion;
    document.getElementById('autor_id').value = autor_id;
  }
  
  function eliminarLibro(id) {
    if (!confirm('¿Estás segura de que quieres eliminar este libro?')) return;
  
    fetch(`http://localhost:3000/api/libros/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        cargarLibros();
      });
  }
  