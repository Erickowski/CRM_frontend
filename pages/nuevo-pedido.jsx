import Layout from "../componentes/Layout";

import AsignarCliente from "../componentes/pedidos/AsignarCliente";
import AsignarProducto from "../componentes/pedidos/AsignarProducto";
import ResumenPedido from "../componentes/pedidos/ResumenPedido";

export default function NuevoPedido() {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProducto />
          <ResumenPedido />
        </div>
      </div>
    </Layout>
  );
}
