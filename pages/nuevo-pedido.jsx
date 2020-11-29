import Layout from "../componentes/Layout";

import AsignarCliente from "../componentes/pedidos/AsignarCliente";
import AsignarProducto from "../componentes/pedidos/AsignarProducto";

export default function NuevoPedido() {
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      <AsignarCliente />
      <AsignarProducto />
    </Layout>
  );
}
