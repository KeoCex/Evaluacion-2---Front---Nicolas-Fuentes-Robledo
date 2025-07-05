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