import React, { useContext } from "react";

import ProductoResumen from "./ProductoResumen";

import PedidoContext from "../../context/pedidos/PedidosContext";

const ResumenPedido = () => {
  const { productos } = useContext(PedidoContext) || [];
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3.- Ajusta las cantidades de los productos.
      </p>
      {!productos || productos.length === 0 ? (
        <p className="mt-5 text-sm">Aún no hay productos, agrega uno.</p>
      ) : (
        <>
          {productos.map((producto) => (
            <ProductoResumen key={producto.id} producto={producto} />
          ))}
        </>
      )}
    </>
  );
};

export default ResumenPedido;
