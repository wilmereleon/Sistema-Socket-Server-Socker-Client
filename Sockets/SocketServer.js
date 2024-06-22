const io = require('socket.io')(3307);
const mysql = require('mysql');

// Configuración de la conexión a la base de datos usando pool
const pool = mysql.createPool({
  connectionLimit: 10, // Número máximo de conexiones en el pool
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recursos_humanos_fisico',
  port: 3307
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.emit('connected', 'Estás conectado al servidor');

  // Operación de inserción
  socket.on('insert', (data) => {
    const query = 'INSERT INTO empleados SET ?';
    pool.query(query, data, (err, result) => {
      if (err) {
        console.error(err);
        socket.emit('error', 'Error en la operación de inserción');
        return;
      }
      socket.emit('result', { operation: 'insert', success: true, result });
    });
  });

  // Operación de actualización
  socket.on('update', (data) => {
    const query = 'UPDATE empleados SET ? WHERE id = ?';
    pool.query(query, [data.values, data.id], (err, result) => {
      if (err) {
        console.error(err);
        socket.emit('error', 'Error en la operación de actualización');
        return;
      }
      socket.emit('result', { operation: 'update', success: true, result });
    });
  });

  // Operación de consulta
  socket.on('select', (id) => {
    const query = 'SELECT * FROM empleados WHERE id = ?';
    pool.query(query, id, (err, result) => {
      if (err) {
        console.error(err);
        socket.emit('error', 'Error en la operación de consulta');
        return;
      }
      socket.emit('result', { operation: 'select', success: true, result });
    });
  });

  // Operación de eliminación
  socket.on('delete', (id) => {
    const query = 'DELETE FROM empleados WHERE id = ?';
    pool.query(query, id, (err, result) => {
      if (err) {
        console.error(err);
        socket.emit('error', 'Error en la operación de eliminación');
        return;
      }
      socket.emit('result', { operation: 'delete', success: true, result });
    });
  });
});