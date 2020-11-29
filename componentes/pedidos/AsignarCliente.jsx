import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";

import PedidoContext from "../../context/pedidos/PedidosContext";

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const AsignarCliente = () => {
  const { agregarCliente } = useContext(PedidoContext);

  const [cliente, setCliente] = useState({});

  useEffect(() => {
    agregarCliente(cliente);
  }, [cliente]);

  // Consultar la base de datos
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  if (loading) return "Cargando...";

  const { obtenerClientesVendedor } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asigna un cliente al pedido.
      </p>
      <Select
        className="mt-2"
        options={obtenerClientesVendedor}
        onChange={(cliente) => setCliente(cliente)}
        getOptionValue={(clientes) => clientes.id}
        getOptionLabel={(clientes) => `${clientes.nombre} ${clientes.apellido}`}
        placeholder="Busque o seleccione el cliente"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarCliente;
