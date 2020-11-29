import { useContext } from "react";

import Layout from "../componentes/Layout";

import AsignarCliente from "../componentes/pedidos/AsignarCliente";
import AsignarProducto from "../componentes/pedidos/AsignarProducto";
import ResumenPedido from "../componentes/pedidos/ResumenPedido";
import Total from "../componentes/pedidos/Total";

import PedidoContext from "../context/pedidos/PedidosContext";

export default function NuevoPedido() {
  const { cliente, productos, total } = useContext(PedidoContext);

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      Object.keys(cliente).length === 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProducto />
          <ResumenPedido />
          <Total />
          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  );
}
