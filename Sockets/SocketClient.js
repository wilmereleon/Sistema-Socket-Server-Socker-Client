const io = require('socket.io-client');
const socket = io.connect('http://localhost:3307');

// Mensaje de conexión
socket.on('connected', (message) => {
  document.getElementById('status').textContent = message;
});

// Insertar un empleado
socket.emit('insert', { 
  empl_primer_nombre: 'Juan', 
  empl_segundo_nombre: 'Perez', 
  empl_email: 'juan.perez@example.com', 
  empl_fecha_nac: '1980-01-01', 
  empl_sueldo: 7000.00, 
  empl_comision: 500.00, 
  empl_cargo_ID: 1, 
  empl_Gerente_ID: null, 
  empl_dpto_ID: 1 
});

// Actualizar un empleado
socket.emit('update', { 
  id: 1, 
  values: { 
    empl_primer_nombre: 'Pedro', 
    empl_segundo_nombre: 'Lopez', 
    empl_email: 'pedro.lopez@example.com', 
    empl_fecha_nac: '1985-02-02', 
    empl_sueldo: 4500.00, 
    empl_comision: 300.00, 
    empl_cargo_ID: 2, 
    empl_Gerente_ID: 1, 
    empl_dpto_ID: 2 
  } 
});

// Consultar un empleado
socket.emit('select', { id: 1 });

// Eliminar un empleado
socket.emit('delete', { id: 1 });

// Escuchar los resultados de las operaciones
socket.on('result', (data) => {
  let message;
  if (data.success) {
    message = `La operación ${data.operation} se ha realizado con éxito. Resultado: ${JSON.stringify(data.result)}`;
  } else {
    message = `La operación ${data.operation} ha fallado`;
  }
  
  // Imprimir el mensaje en la consola
  console.log(message);
  
  // Mostrar el mensaje en el HTML
  document.getElementById('result').textContent = message;
});