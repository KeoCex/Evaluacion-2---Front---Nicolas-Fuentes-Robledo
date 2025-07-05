import React, { useState } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  // Validacion
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (/\d/.test(nombre)) {
      nuevosErrores.nombre = 'El nombre no debe contener números';
    }

    if (!precio.trim()) {
      nuevosErrores.precio = 'El precio es obligatorio';
    } else if (!/^\d+(\.\d{1,2})?$/.test(precio) || parseFloat(precio) <= 0) {
      nuevosErrores.precio = 'El precio debe ser un número positivo válido';
    }

    if (!categoria.trim()) {
      nuevosErrores.categoria = 'La categoría es obligatoria';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const formatearPrecio = (numero) => {
    const partes = Number(numero).toFixed(0).toString().split('').reverse();
    return '$' + partes.reduce((acc, char, idx) =>
      acc + char + ((idx + 1) % 3 === 0 && idx + 1 !== partes.length ? '.' : ''), '').split('').reverse().join('');
  };

  const agregarProducto = () => {
    const nuevoProducto = {
      nombre,
      precio: formatearPrecio(precio),
      categoria
    };

    setProductos([...productos, nuevoProducto]);
    setNombre('');
    setPrecio('');
    setCategoria('');
    setMensaje('Producto registrado correctamente');
    setErrores({});
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setMensaje('');

    if (validarFormulario()) {
      agregarProducto();
    }
  };

  return (
    <div className="contenedor">
      <h2>Formulario de Productos</h2>
      <form onSubmit={manejarEnvio}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>

        <div>
          <label>Precio:</label>
          <input
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          {errores.precio && <span className="error">{errores.precio}</span>}
        </div>

        <div>
          <label>Categoría:</label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
          {errores.categoria && <span className="error">{errores.categoria}</span>}
        </div>

        <button type="submit">Agregar Producto</button>
      </form>

      {mensaje && <div className="mensaje">{mensaje}</div>}

      <h3>Lista de Productos</h3>
      <ul>
        {productos.map((prod, index) => (
          <li key={index}>
            {prod.nombre} - {prod.precio} ({prod.categoria})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

