const io = require('socket.io')(3000);
const mysql = require('mysql');
const util = require('util');

// Configuración de la conexión a la base de datos usando pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recursos_humanos_fisico',
  port: 3307
});

// Promisify para usar async/await con pool.query
pool.query = util.promisify(pool.query);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.emit('connected', 'Estás conectado al servidor');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  // Operación de inserción
  socket.on('insert', async (data) => {
    try {
      const result = await pool.query('INSERT INTO empleados SET ?', data);
      socket.emit('result', { operation: 'insert', success: true, result });
    } catch (err) {
      handleError(socket, err, 'inserción');
    }
  });

  // Operación de actualización
  socket.on('update', async (data) => {
    try {
      const result = await pool.query('UPDATE empleados SET ? WHERE id = ?', [data.values, data.id]);
      socket.emit('result', { operation: 'update', success: true, result });
    } catch (err) {
      handleError(socket, err, 'actualización');
    }
  });

  // Operación de consulta
  socket.on('select', async (id) => {
    try {
      const result = await pool.query('SELECT * FROM empleados WHERE id = ?', id);
      socket.emit('result', { operation: 'select', success: true, result });
    } catch (err) {
      handleError(socket, err, 'consulta');
    }
  });

  // Operación de eliminación
  socket.on('delete', async (id) => {
    try {
      const result = await pool.query('DELETE FROM empleados WHERE id = ?', id);
      socket.emit('result', { operation: 'delete', success: true, result });
    } catch (err) {
      handleError(socket, err, 'eliminación');
    }
  });
});

function handleError(socket, err, operation) {
  console.error(err);
  socket.emit('error', `Error en la operación de ${operation}`);
}