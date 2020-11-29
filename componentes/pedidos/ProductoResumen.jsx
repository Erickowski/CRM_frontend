import React, { useContext, useEffect, useState } from "react";

import PedidoContext from "../../context/pedidos/PedidosContext";

const ProductoResumen = ({ producto }) => {
  const { nombre, precio } = producto;

  const { cantidadProductos } = useContext(PedidoContext);

  const [cantidad, setCantidad] = useState(0);

  const actualizarCantidad = () => {
    const nuevoProducto = { ...producto, cantidad: Number(cantidad) };
    cantidadProductos(nuevoProducto);
  };

  useEffect(() => {
    actualizarCantidad();
  }, [cantidad]);

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-1/2 mb-2 md:mb-0">
        <p className="text-sm">{nombre}</p>
        <p>$ {precio}</p>
      </div>
      <input
        type="number"
        placeholder="Cantidad"
        className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4"
        onChange={(e) => setCantidad(e.target.value)}
        value={cantidad}
      />
    </div>
  );
};

export default ProductoResumen;
