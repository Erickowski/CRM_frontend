import Layout from "../componentes/Layout";

import AsignarCliente from "../componentes/pedidos/AsignarCliente";
import AsignarProducto from "../componentes/pedidos/AsignarProducto";
import ResumenPedido from "../componentes/pedidos/ResumenPedido";
import Total from "../componentes/pedidos/Total";

export default function NuevoPedido() {
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
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900`}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  );
}
