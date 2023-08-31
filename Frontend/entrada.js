const llegada = document.getElementById('formularioLlegada');

llegada.addEventListener('submit', function(e) {

    e.preventDefault(); // previene que se recargue la página
  
    // obtener datos del formulario
    const data = {
      fechaLlegada: document.getElementById('fechaLlegada').value,
      departamento: document.getElementById('departamento').value,
      vehiculo: document.getElementById('vehiculo').value,
      horaLlegada: document.getElementById('horaLlegada').value,
      kmLlegada: document.getElementById('kmLlegada').value,
      nombreVigilante2: document.getElementById('nombreVigilante2').value,
      firmaVigilante2: document.getElementById('firmaVigilante2').value,
      firmaUsuario2: document.getElementById('firmaUsuario2').value,
      destinoLocal: document.getElementById('destinoLocal').checked,
      destinoForaneo: document.getElementById('destinoForaneo').checked,
      accesorios: Array.from(document.querySelectorAll('input[name="accesorios"]:checked')).map(input => input.value),
      observaciones: document.getElementById('observaciones').value
    };
    
    console.log(data);
  
    // enviar datos a API
    fetch('http://localhost:3010/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.error(error); 
    });
  
  });