import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";

import PedidoContext from "../../context/pedidos/PedidosContext";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      precio
      existencia
    }
  }
`;

const AsignarProducto = () => {
  // Consulta la base de datos
  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  const [productos, setProductos] = useState([]);

  const { agregarProductos } = useContext(PedidoContext);

  useEffect(() => {
    agregarProductos(productos);
  }, [productos]);

  if (loading) return "Cargando...";

  const { obtenerProductos } = data;

  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Selecciona o busca los productos.
      </p>
      <Select
        className="mt-2"
        isMulti={true}
        options={obtenerProductos}
        onChange={(producto) => setProductos(producto)}
        getOptionValue={(productos) => productos.id}
        getOptionLabel={(productos) =>
          `${productos.nombre} - ${productos.existencia} disponibles`
        }
        placeholder="Busque o seleccione el producto"
        noOptionsMessage={() => "No hay resultados"}
      />
    </>
  );
};

export default AsignarProducto;
