import { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import Layout from "../componentes/Layout";

import AsignarCliente from "../componentes/pedidos/AsignarCliente";
import AsignarProducto from "../componentes/pedidos/AsignarProducto";
import ResumenPedido from "../componentes/pedidos/ResumenPedido";
import Total from "../componentes/pedidos/Total";

import PedidoContext from "../context/pedidos/PedidosContext";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        nombre
        cantidad
      }
      cliente {
        id
        nombre
        apellido
        email
        telefono
      }
      vendedor
      total
      estado
    }
  }
`;

export default function NuevoPedido() {
  const router = useRouter();

  const [mensaje, setMensaje] = useState(null);

  const { cliente, productos, total } = useContext(PedidoContext);

  // Mutation para crear nuevo pedido
  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
    update(cache, { data: { nuevoPedido } }) {
      const { obtenerPedidosVendedor } = cache.readQuery({
        query: OBTENER_PEDIDOS,
      });

      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data: {
          obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido],
        },
      });
    },
  });

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      Object.keys(cliente).length === 0
      ? " opacity-50 cursor-not-allowed "
      : "";
  };

  const crearNuevoPedido = async () => {
    // Remover lo no deseado de productos
    const pedido = productos.map(
      ({ existencia, __typename, ...producto }) => producto
    );

    try {
      const { id } = cliente;
      await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido,
          },
        },
      });
      // Redireccionar
      router.push("/pedidos");
      // Mostrar alerta
      Swal.fire(
        "Pedido creado.",
        "El pedido fue creado correctamente.",
        "success"
      );
    } catch (error) {
      setMensaje(error.message.replace("GraphQL error: ", ""));
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  };

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProducto />
          <ResumenPedido />
          <Total />
          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validarPedido()}`}
            onClick={() => crearNuevoPedido()}
          >
            Registrar pedido
          </button>
        </div>
      </div>
    </Layout>
  );
}
