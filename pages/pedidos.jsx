import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

import Layout from "../componentes/Layout";
import Pedido from "../componentes/Pedido";

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        nombre
        cantidad
      }
      cliente
      vendedor
      total
      estado
    }
  }
`;

export default function Pedidos() {
  const { data, loading, error } = useQuery(OBTENER_PEDIDOS);

  if (loading) return "Cargando...";
  console.log(data);

  const { obtenerPedidosVendedor } = data;

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
      <Link href="/nuevo-pedido">
        <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
          Nuevo Pedido
        </a>
      </Link>
      {obtenerPedidosVendedor.length === 0 ? (
        <p className="mt-5 text-center text-2xl">No hay pedidos aún</p>
      ) : (
        obtenerPedidosVendedor.map((pedido) => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))
      )}
    </Layout>
  );
}
