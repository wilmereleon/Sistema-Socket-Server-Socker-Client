const io = require('socket.io')(3307);
const mysql = require('mysql');

// Crear mensaje de conexión
io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');
    socket.emit('connected', 'Estás conectado al servidor');
    // ...
  });

// Crear la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'recursos_humanos_fisico',
  port: 3307
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos');
});

// Escuchar conexiones entrantes
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Escuchar eventos de inserción
  socket.on('insert', (data) => {
    const query = 'INSERT INTO empleados SET ?';
    db.query(query, data, (err, result) => {
      if (err) throw err;
      socket.emit('result', result);
    });
  });

  // Escuchar eventos de actualización
  socket.on('update', (data) => {
    const query = 'UPDATE empleados SET ? WHERE id = ?';
    db.query(query, [data.values, data.id], (err, result) => {
      if (err) throw err;
      socket.emit('result', result);
    });
  });

  // Escuchar eventos de consulta
  socket.on('select', (id) => {
    const query = 'SELECT * FROM empleados WHERE id = ?';
    db.query(query, id, (err, result) => {
      if (err) throw err;
      socket.emit('result', result);
    });
  });

  // Escuchar eventos de eliminación
  socket.on('delete', (id) => {
    const query = 'DELETE FROM empleados WHERE id = ?';
    db.query(query, id, (err, result) => {
      if (err) throw err;
      socket.emit('result', result);
    });
  });
});

socket.on('insert', (data) => {
    const query = 'INSERT INTO empleados SET ?';
    db.query(query, data, (err, result) => {
      if (err) throw err;
      socket.emit('result', { operation: 'insert', success: true, result });
    });
  });