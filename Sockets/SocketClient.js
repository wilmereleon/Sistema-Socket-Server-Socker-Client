const io = require('socket.io-client');
const socket = io.connect('http://localhost:3307');

// Insertar un empleado
socket.emit('insert', { nombre: 'Juan', puesto: 'Desarrollador' });

// Actualizar un empleado
socket.emit('update', { id: 1, values: { nombre: 'Pedro', puesto: 'Analista' } });

// Consultar un empleado
socket.emit('select', 1);

// Eliminar un empleado
socket.emit('delete', 1);

// Escuchar los resultados de las operaciones
socket.on('result', (result) => {
  console.log(result);
});